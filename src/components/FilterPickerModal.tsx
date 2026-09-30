import { theme } from "../ui";
import { FilterPicker } from "./FilterPicker";

type BaseProps = {
  /** Display label for the filter, e.g. "assignee". Used for title + toasts. */
  label: string;
  items: string[];
  onCancel: () => void;
  /** Enables the Tab show-only/exclude toggle (only the status filter uses it). */
  allowExclude?: boolean;
  initialExclude?: boolean;
};

type SingleSelectProps = BaseProps & {
  multiSelect?: false;
  currentId: string | null;
  onPick: (id: string, exclude: boolean) => void;
  onClear: () => void;
  initialSelected?: never;
  onApply?: never;
};

type MultiSelectProps = BaseProps & {
  multiSelect: true;
  initialSelected: string[];
  /** Called once with the full selection when the user leaves (Esc). */
  onApply: (ids: string[], exclude: boolean) => void;
  currentId?: never;
  onPick?: never;
  onClear?: never;
};

type Props = SingleSelectProps | MultiSelectProps;

/**
 * One filter-* modal shape shared across assignee / type / sprint / label /
 * epic / status. The filters only differ in their label, their options source,
 * and which slice of `filters` they own — everything else (title, border,
 * cancel-returns-to-menu) is identical. Status opts into `allowExclude` for its
 * show-only/exclude toggle and `multiSelect` for toggle-in-place selection.
 */
export function FilterPickerModal(props: Props) {
  const { label, items, onCancel, allowExclude, initialExclude } = props;
  return (
    <FilterPicker
      title={`Filter by ${label}`}
      items={items.map((v) => ({ id: v, label: v }))}
      borderColor={theme.info}
      onCancel={onCancel}
      {...(allowExclude ? { allowExclude } : {})}
      {...(initialExclude ? { initialExclude } : {})}
      {...(props.multiSelect
        ? { multiSelect: true, initialSelected: props.initialSelected, onApply: props.onApply }
        : {
            onPick: props.onPick,
            onClear: props.onClear,
            ...(props.currentId ? { currentId: props.currentId } : {}),
          })}
    />
  );
}
