function Toast({ message, type = 'success' }) {
    const colors = {
      success: 'bg-green-100 text-green-700',
      error: 'bg-red-100 text-red-700',
    };

    return (
      <div className={`fixed top-5 right-5 p-4 rounded shadow-md ${colors[type]} transition`}>
        {message}
      </div>
    );
  }

  export default Toast;
