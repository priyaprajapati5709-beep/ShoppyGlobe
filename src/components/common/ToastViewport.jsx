import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismissToast } from '../../redux/uiSlice';

const TOAST_TIMEOUT_MS = 2600;

function ToastViewport() {
  const dispatch = useDispatch();
  const toasts = useSelector((state) => state.ui.toasts);

  useEffect(() => {
    if (!toasts.length) return undefined;

    const timers = toasts.map((toast) =>
      window.setTimeout(() => dispatch(dismissToast(toast.id)), TOAST_TIMEOUT_MS),
    );

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [dispatch, toasts]);

  if (!toasts.length) return null;

  return (
    <div className="toast-viewport" aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.variant}`}>
          <div>
            <strong>{toast.title}</strong>
            {toast.message ? <p>{toast.message}</p> : null}
          </div>
          <button type="button" className="toast__close" onClick={() => dispatch(dismissToast(toast.id))}>
            x
          </button>
        </div>
      ))}
    </div>
  );
}

export default ToastViewport;
