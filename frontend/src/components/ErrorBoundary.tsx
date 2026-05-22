import React, { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';
import i18n from '../i18n';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };
  props: any;

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-4">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-2xl max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="text-red-500 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{i18n.t('errorBoundary.title', 'System Malfunction')}</h1>
            <p className="text-slate-400 mb-6">
              {i18n.t('errorBoundary.message', 'Our sensors detected an unexpected error in the interface. The application has been paused to protect data integrity.')}
            </p>
            <div className="bg-slate-900 p-4 rounded-lg mb-6 text-left overflow-hidden">
              <code className="text-xs text-red-400 font-mono break-all">
                {this.state.error?.toString()}
              </code>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-primary hover:bg-blue-600 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RefreshCcw size={18} />
              {i18n.t('errorBoundary.cta', 'Reboot System')}
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;