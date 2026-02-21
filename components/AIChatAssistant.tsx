import React, { useState, useRef, useEffect, useCallback } from 'react';
import { LoanInputs, CalculatedResults } from '../types';
import { formatCurrency, formatPercent } from '../utils/calculations';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface AIChatAssistantProps {
  apiKey: string;
  dealInputs?: LoanInputs;
  dealResults?: CalculatedResults;
  onClose: () => void;
  onOpenSettings: () => void;
}

const SYSTEM_PROMPT = `You are ZS AI, a helpful assistant built into the ZS Rehab Flip Calculator — a professional real estate fix-and-flip analysis tool.

**Your Role:** Help users understand the calculator, analyze deals, and learn real estate investing concepts.

**App Features You Know About:**
- Deal analysis: Purchase price, ARV, rehab budget, financing, closing costs, holding costs, exit costs → net profit & ROI
- 70% Rule check: (ARV × 0.70) − Rehab ≤ Purchase Price
- LTV / LTC / LTARV ratios
- Lender comparison: Side-by-side lender fee/rate analysis
- Sensitivity analysis: What-if scenarios for purchase price and rehab
- Rehab Auto-Estimator: 4 grades (Rental/Standard/Premium/Luxury) with per-sqft cost engine
- Plan B Rental/STR Analysis: Long-term rental & short-term rental NOI, cap rate, cash-on-cash, DSCR
- Portfolio Dashboard: Multi-deal KPI cards, sortable table, profit distribution chart
- Deal Sharing: URL-encoded read-only share links
- Branded Reports: Custom company name, logo, colors for PDF export
- State-specific defaults: Transfer taxes, title insurance, closing costs by state
- NORMAL vs HIDEOUT mode: HIDEOUT includes additional Walker/Hideout-specific settlement fees

**Key Calculations:**
- Net Profit = ARV − Purchase − Rehab − Closing Costs − Holding Costs − Exit Costs (seller commissions, transfer tax)
- ROI = Net Profit / Total Cash Invested × 100
- Cash to Close = Gap (purchase − loan) + Closing Costs − Credits
- Monthly Payment = Loan Amount × (Interest Rate / 12)
- Holding Costs = Monthly payment × months + utilities + insurance + taxes
- Max Offer (70% Rule) = ARV × 0.70 − Rehab Budget

**Real Estate Expertise:**
- Fix-and-flip deal analysis, ARV comps, rehab budgeting
- Hard money / private lending terms (points, interest-only, draw schedules)
- Closing costs (lender fees, title insurance, transfer tax, recording, etc.)
- Exit strategies (sell, BRRR, rent)
- Market analysis basics, cap rates, cash-on-cash returns
- Tax implications (capital gains, self-employment tax for flippers)

**Guidelines:**
- Be concise and practical. Use numbers and examples when possible.
- If a user asks about their current deal, reference the deal context provided.
- Suggest using specific calculator features when relevant.
- Always be honest if you don't know something. Don't fabricate real estate data.
- Use dollar formatting for money and percentage formatting for rates.
- Keep responses focused and under 300 words unless the user asks for detail.`;

const generateDealContext = (inputs?: LoanInputs, results?: CalculatedResults): string => {
  if (!inputs || !results) return '';
  
  return `\n\n**Current Deal Context:**
- Address: ${inputs.address || 'Not set'}
- Purchase Price: ${formatCurrency(inputs.purchasePrice)}
- ARV: ${formatCurrency(inputs.arv)}
- Rehab Budget: ${formatCurrency(inputs.rehabBudget)}
- Sq Ft: ${inputs.sqFt || 'N/A'} | Beds: ${inputs.beds || 'N/A'} | Baths: ${inputs.baths || 'N/A'}
- Loan Amount: ${formatCurrency(results.qualifiedLoanAmount)}
- Interest Rate: ${inputs.interestRate}% | Points: ${inputs.loanPoints}
- LTV: ${formatPercent(results.ltv)} | LTC: ${formatPercent(results.ltc)} | LTARV: ${formatPercent(results.ltarv)}
- Hold Period: ${inputs.rehabMonths} months
- Total Closing Costs: ${formatCurrency(results.totalClosingCosts)}
- Total Holding Costs: ${formatCurrency(results.totalHoldingCosts)}
- Total Exit Costs: ${formatCurrency(results.totalExitCosts)}
- Cash to Close: ${formatCurrency(results.totalCashToClose)}
- Net Profit: ${formatCurrency(results.netProfit)}
- ROI: ${formatPercent(results.roi)}
- 70% Rule: ${results.passes70Rule ? 'PASS' : 'FAIL'} (Max offer: ${formatCurrency(results.maxPurchasePrice70Rule)})
- State: ${inputs.selectedState || 'Not set'}`;
};

export const AIChatAssistant: React.FC<AIChatAssistantProps> = ({
  apiKey,
  dealInputs,
  dealResults,
  onClose,
  onOpenSettings,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    if (!isMinimized) inputRef.current?.focus();
  }, [isMinimized]);

  // Add welcome message on mount
  useEffect(() => {
    setMessages([{
      id: 'welcome',
      role: 'assistant',
      content: `👋 Hi! I'm **ZS AI**, your real estate deal assistant.\n\nI can help you with:\n- 📊 Analyzing your current deal\n- 💡 Explaining calculator features\n- 🏠 Real estate investing concepts\n- 🔢 Running through numbers\n\n${dealInputs?.purchasePrice ? `I can see you're working on a deal${dealInputs.address ? ` at **${dealInputs.address}**` : ''}. Ask me anything about it!` : 'Load a deal or enter some numbers, and I can help you analyze it!'}\n\nWhat would you like to know?`,
      timestamp: new Date(),
    }]);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    if (!apiKey) {
      setError('No API key configured. Go to Settings → AI Assistant to add your OpenAI API key.');
      return;
    }

    setError(null);
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsStreaming(true);

    const assistantMessageId = `assistant-${Date.now()}`;
    setMessages(prev => [...prev, {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
    }]);

    try {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      const dealContext = generateDealContext(dealInputs, dealResults);
      const systemMessage = SYSTEM_PROMPT + dealContext;

      // Build conversation history (last 20 messages for context window)
      const conversationHistory = messages
        .filter(m => m.role !== 'system' && m.id !== 'welcome')
        .slice(-20)
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemMessage },
            ...conversationHistory,
            { role: 'user', content: trimmed },
          ],
          stream: true,
          temperature: 0.7,
          max_tokens: 1000,
        }),
        signal: abortController.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your OpenAI API key in Settings.');
        } else if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please wait a moment and try again.');
        } else if (response.status === 402 || response.status === 403) {
          throw new Error('API key issue: Check your OpenAI account billing or permissions.');
        }
        throw new Error(errorData.error?.message || `API error (${response.status})`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n').filter(line => line.trim().startsWith('data: '));

        for (const line of lines) {
          const data = line.replace('data: ', '').trim();
          if (data === '[DONE]') break;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              accumulated += delta;
              setMessages(prev => prev.map(m =>
                m.id === assistantMessageId ? { ...m, content: accumulated } : m
              ));
            }
          } catch {
            // Skip malformed JSON chunks
          }
        }
      }
    } catch (err: any) {
      if (err.name === 'AbortError') {
        // User cancelled
        setMessages(prev => prev.map(m =>
          m.id === assistantMessageId ? { ...m, content: m.content + '\n\n*(Cancelled)*' } : m
        ));
      } else {
        setError(err.message || 'Something went wrong');
        // Remove empty assistant message on error
        setMessages(prev => prev.filter(m => !(m.id === assistantMessageId && !m.content)));
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  }, [input, isStreaming, apiKey, messages, dealInputs, dealResults]);

  const handleStop = () => {
    abortControllerRef.current?.abort();
  };

  const handleClearChat = () => {
    setMessages([{
      id: 'welcome-reset',
      role: 'assistant',
      content: '🔄 Chat cleared. Ask me anything about your deal or the calculator!',
      timestamp: new Date(),
    }]);
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = [
    { label: '📊 Analyze my deal', prompt: 'Analyze my current deal. Is it a good investment? What are the risks?' },
    { label: '💰 Improve profit', prompt: 'How can I improve the profit on this deal? What levers should I pull?' },
    { label: '📐 Explain 70% rule', prompt: 'Explain the 70% rule and how it applies to my current deal.' },
    { label: '🏦 Compare financing', prompt: 'What should I look for when comparing hard money lenders for this deal?' },
  ];

  // Minimized floating button
  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl transition-all hover:scale-110 no-print"
        title="Open AI Assistant"
      >
        <span className="text-2xl">🤖</span>
        {messages.length > 1 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {messages.filter(m => m.role === 'assistant' && m.id !== 'welcome').length}
          </span>
        )}
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden no-print">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="text-white font-bold text-sm leading-none">ZS AI Assistant</h3>
            <span className="text-purple-200 text-[10px]">Powered by GPT-4o-mini</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleClearChat}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            title="Clear chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
            </svg>
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            title="Minimize"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* No API Key Warning */}
      {!apiKey && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2">
          <span className="text-amber-600 text-sm">⚠️</span>
          <p className="text-xs text-amber-800 flex-1">
            Add your OpenAI API key in{' '}
            <button onClick={onOpenSettings} className="underline font-semibold hover:text-amber-900">
              Settings
            </button>{' '}
            to enable AI chat.
          </p>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}
            >
              <div className="whitespace-pre-wrap break-words">
                {msg.role === 'assistant' ? renderMarkdown(msg.content) : msg.content}
              </div>
              {msg.role === 'assistant' && !msg.content && isStreaming && (
                <div className="flex items-center gap-1 py-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions (shown when few messages) */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
          {quickActions.map((action, i) => (
            <button
              key={i}
              onClick={() => { setInput(action.prompt); setTimeout(() => inputRef.current?.focus(), 50); }}
              className="text-xs bg-gray-100 hover:bg-indigo-50 hover:text-indigo-700 text-gray-600 px-2.5 py-1.5 rounded-full border border-gray-200 hover:border-indigo-200 transition"
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="px-4 pb-2 shrink-0">
          <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-xs text-red-700 flex items-start gap-2">
            <span className="shrink-0 mt-0.5">❌</span>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 p-3 shrink-0">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={apiKey ? 'Ask about your deal, the calculator, or real estate...' : 'Add your API key in Settings first...'}
            disabled={!apiKey}
            rows={1}
            className="flex-1 resize-none border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed max-h-24 overflow-y-auto"
            style={{ minHeight: '38px' }}
            onInput={(e) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto';
              target.style.height = Math.min(target.scrollHeight, 96) + 'px';
            }}
          />
          {isStreaming ? (
            <button
              onClick={handleStop}
              className="bg-red-500 hover:bg-red-600 text-white rounded-xl p-2 transition shrink-0"
              title="Stop generating"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                <rect x="6" y="6" width="12" height="12" rx="1" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim() || !apiKey}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-xl p-2 transition shrink-0"
              title="Send message"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
              </svg>
            </button>
          )}
        </div>
        <p className="text-[10px] text-gray-400 mt-1.5 text-center">
          Shift+Enter for new line • Responses use your OpenAI API key
        </p>
      </div>
    </div>
  );
};

/** Simple markdown-like renderer for bold, code, and bullet points */
function renderMarkdown(text: string): React.ReactNode {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIdx) => {
    if (lineIdx > 0) elements.push(<br key={`br-${lineIdx}`} />);

    // Bullet points
    const bulletMatch = line.match(/^(\s*)[•\-\*]\s+(.*)/);
    if (bulletMatch) {
      const indent = bulletMatch[1].length > 0;
      elements.push(
        <span key={`line-${lineIdx}`} className={`flex items-start gap-1.5 ${indent ? 'ml-4' : ''}`}>
          <span className="text-indigo-400 shrink-0 mt-0.5">•</span>
          <span>{formatInline(bulletMatch[2], lineIdx)}</span>
        </span>
      );
      return;
    }

    elements.push(<span key={`line-${lineIdx}`}>{formatInline(line, lineIdx)}</span>);
  });

  return <>{elements}</>;
}

/** Format inline markdown: **bold**, `code`, _italic_ */
function formatInline(text: string, lineIdx: number): React.ReactNode {
  const parts: React.ReactNode[] = [];
  // Match **bold**, `code`, or plain text
  const regex = /(\*\*(.+?)\*\*)|(`(.+?)`)|([^*`]+)/g;
  let match;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match[2]) {
      // Bold
      parts.push(<strong key={`${lineIdx}-${i}`} className="font-semibold">{match[2]}</strong>);
    } else if (match[4]) {
      // Code
      parts.push(
        <code key={`${lineIdx}-${i}`} className="bg-gray-200 text-indigo-700 px-1 py-0.5 rounded text-xs font-mono">
          {match[4]}
        </code>
      );
    } else if (match[5]) {
      parts.push(<span key={`${lineIdx}-${i}`}>{match[5]}</span>);
    }
    i++;
  }

  return parts.length > 0 ? <>{parts}</> : text;
}
