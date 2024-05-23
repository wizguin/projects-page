// Helper function for creating dynamic class names
export function classNames(...classes: (string | boolean)[]) {
    return classes.filter(Boolean).join(' ')
}
