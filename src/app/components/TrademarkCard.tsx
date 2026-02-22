import { Calendar, Building2, Hash, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export interface Trademark {
  id: string;
  name: string;
  registrationNumber: string;
  owner: string;
  category: string;
  status: 'registered' | 'pending' | 'expired' | 'rejected';
  registrationDate: string;
  expiryDate?: string;
  description: string;
}

interface TrademarkCardProps {
  trademark: Trademark;
  onViewDetails: (trademark: Trademark) => void;
}

export function TrademarkCard({ trademark, onViewDetails }: TrademarkCardProps) {
  const getStatusIcon = () => {
    switch (trademark.status) {
      case 'registered':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'expired':
        return <AlertCircle className="text-orange-500" size={20} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={20} />;
    }
  };

  const getStatusText = () => {
    switch (trademark.status) {
      case 'registered':
        return 'Зарегистрирован';
      case 'pending':
        return 'На рассмотрении';
      case 'expired':
        return 'Истек срок';
      case 'rejected':
        return 'Отклонен';
    }
  };

  const getStatusColor = () => {
    switch (trademark.status) {
      case 'registered':
        return 'bg-green-50 border-green-200';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200';
      case 'expired':
        return 'bg-orange-50 border-orange-200';
      case 'rejected':
        return 'bg-red-50 border-red-200';
    }
  };

  return (
    <div className={`border rounded-lg p-6 hover:shadow-lg transition-shadow ${getStatusColor()}`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {trademark.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Hash size={16} />
            <span>{trademark.registrationNumber}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="text-sm font-medium">{getStatusText()}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4 line-clamp-2">
        {trademark.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building2 size={16} />
          <span>Владелец: {trademark.owner}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />
          <span>Дата регистрации: {trademark.registrationDate}</span>
        </div>
        {trademark.expiryDate && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar size={16} />
            <span>Срок действия: до {trademark.expiryDate}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-sm font-medium text-blue-600">
          {trademark.category}
        </span>
        <button
          onClick={() => onViewDetails(trademark)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
        >
          Подробнее →
        </button>
      </div>
    </div>
  );
}
