

export const formatTime = (totalSeconds) => {

  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');

  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${minutes}:${seconds}`;

};


export const formatChatStartTime = (dateStr) => {
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

