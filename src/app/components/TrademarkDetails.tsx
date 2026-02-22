import { X, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";
import { Trademark } from "./TrademarkCard";

interface TrademarkDetailsProps {
  trademark: Trademark;
  onClose: () => void;
}

export function TrademarkDetails({ trademark, onClose }: TrademarkDetailsProps) {
  const getStatusIcon = () => {
    switch (trademark.status) {
      case 'registered':
        return <CheckCircle className="text-green-500" size={32} />;
      case 'pending':
        return <Clock className="text-yellow-500" size={32} />;
      case 'expired':
        return <AlertCircle className="text-orange-500" size={32} />;
      case 'rejected':
        return <XCircle className="text-red-500" size={32} />;
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

  const getAvailabilityMessage = () => {
    switch (trademark.status) {
      case 'registered':
        return {
          text: 'Данный товарный знак уже зарегистрирован. Регистрация идентичного или сходного до степени смешения обозначения в той же категории невозможна.',
          color: 'bg-red-50 border-red-200 text-red-800',
        };
      case 'pending':
        return {
          text: 'Заявка находится на рассмотрении. Рекомендуется дождаться результата рассмотрения данной заявки.',
          color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        };
      case 'expired':
        return {
          text: 'Срок действия истек. Возможна регистрация данного обозначения при соблюдении условий законодательства КР.',
          color: 'bg-green-50 border-green-200 text-green-800',
        };
      case 'rejected':
        return {
          text: 'Заявка была отклонена. Необходим анализ причин отказа перед подачей новой заявки.',
          color: 'bg-orange-50 border-orange-200 text-orange-800',
        };
    }
  };

  const availability = getAvailabilityMessage();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {trademark.name}
            </h2>
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <span className="text-lg font-medium">{getStatusText()}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={28} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className={`border rounded-lg p-4 ${availability.color}`}>
            <h3 className="font-semibold mb-2">Возможность регистрации:</h3>
            <p>{availability.text}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Регистрационный номер
              </h4>
              <p className="text-lg font-semibold">{trademark.registrationNumber}</p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Категория (МКТУ)
              </h4>
              <p className="text-lg font-semibold">{trademark.category}</p>
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Дата регистрации
              </h4>
              <p className="text-lg font-semibold">{trademark.registrationDate}</p>
            </div>

            {trademark.expiryDate && (
              <div className="border rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">
                  Срок действия
                </h4>
                <p className="text-lg font-semibold">до {trademark.expiryDate}</p>
              </div>
            )}
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Владелец
            </h4>
            <p className="text-lg">{trademark.owner}</p>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-500 mb-2">
              Описание и назначение
            </h4>
            <p className="text-gray-700 leading-relaxed">{trademark.description}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">
              📋 Рекомендации
            </h4>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Проконсультируйтесь с патентным поверенным перед подачей заявки</li>
              <li>• Проверьте сходство с другими товарными знаками в вашей категории</li>
              <li>• Ознакомьтесь с требованиями Кыргызпатента к оформлению заявки</li>
              <li>• Убедитесь в уплате всех необходимых пошлин</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
