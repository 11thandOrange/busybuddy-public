import type { Widget } from '@busybuddy/shared';
import { Icon, ArrowUpRight } from './Icon';

interface WidgetCardProps {
  widget: Widget;
  active: boolean;
  onActivate: () => void;
  onOpen: () => void;
}

export function WidgetCard({ widget, active, onActivate, onOpen }: WidgetCardProps) {
  const style = {
    ['--wcolor' as string]: widget.color,
    ['--wtint' as string]: widget.tint,
  } as React.CSSProperties;

  return (
    <button
      type="button"
      style={style}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onOpen}
      aria-pressed={active}
      className={`group flex items-center gap-[10px] rounded-2xl border bg-white/95 p-[14px] text-left backdrop-blur transition-all duration-200 hover:-translate-y-1.5 hover:border-ink hover:shadow-card ${
        active ? '-translate-y-1.5 border-ink shadow-card' : 'border-line'
      }`}
    >
      <span
        className="flex h-[42px] w-[42px] flex-shrink-0 items-center justify-center rounded-[10px]"
        style={{ background: 'var(--wtint)', color: 'var(--wcolor)' }}
      >
        <Icon svg={widget.icon} className="[&_svg]:h-[22px] [&_svg]:w-[22px]" />
      </span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="text-[13px] font-bold leading-tight">{widget.name}</span>
        <span className="truncate text-[10px] leading-tight text-muted">{widget.short}</span>
      </span>
      <span
        className={`ml-auto transition-opacity ${active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <ArrowUpRight />
      </span>
    </button>
  );
}
