function ConfirmModal({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center z-50 px-6">
      <div className="bg-paper border border-divider rounded-sm p-6 max-w-sm w-full">
        <h3 className="font-display text-xl font-bold text-ink mb-2">{title}</h3>
        <p className="text-ink/70 mb-6">{message}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="font-mono text-xs uppercase tracking-wide text-ink/50 hover:text-ink px-4 py-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="font-mono text-xs uppercase tracking-wide bg-muted-red text-paper px-4 py-2 rounded-sm hover:bg-muted-red/90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal