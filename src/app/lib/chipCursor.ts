let chipHoverDepth = 0;
const listeners = new Set<(active: boolean) => void>();

function emit() {
  const active = chipHoverDepth > 0;
  listeners.forEach((cb) => cb(active));
}

export function subscribeChipCursor(cb: (active: boolean) => void) {
  listeners.add(cb);
  cb(chipHoverDepth > 0);
  return () => {
    listeners.delete(cb);
  };
}

export function enterChipCursor() {
  chipHoverDepth += 1;
  emit();
}

export function leaveChipCursor() {
  chipHoverDepth = Math.max(0, chipHoverDepth - 1);
  emit();
}
