// src/components/PriorityLabel.tsx

interface PriorityLabelProps {
    priority: 'urgent' | 'high' | 'normal' | 'low';
  }
  
  const getPriorityClass = (priority: 'urgent' | 'high' | 'normal' | 'low') => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white'; // Urgent priority with red background
      case 'high':
        return 'bg-orange-400 text-white'; // High priority with orange background
      case 'normal':
        return 'bg-blue-400 text-white'; // Normal priority with blue background
      case 'low':
        return 'bg-green-500 text-white'; // Low priority with green background
      default:
        return '';
    }
  };
  
  const PriorityLabel = ({ priority }: PriorityLabelProps) => {
    return (
      <span className={`absolute left-2 text-xs font-bold py-1 px-2 rounded ${getPriorityClass(priority)}`}>
        {priority.toUpperCase()}
      </span>
    );
  };
  
  export default PriorityLabel;
  