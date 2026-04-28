import type { StackInput } from "../../types/formatter";

export function createStackIconSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/\.js/g, "js")
    .replace(/\.io/g, "io")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9가-힣]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

export function getStackIconPath(input: StackInput) {
  return input.iconPath?.trim() || `/assets/stacks/${input.iconSlug || "{iconSlug}"}.svg`;
}

export function formatStackItem(input: StackInput) {
  return JSON.stringify(
    {
      name: input.name.trim(),
      icon: getStackIconPath(input),
      proficiency: input.proficiency,
      descriptions: input.descriptions.map((description) => description.trim()).filter(Boolean),
    },
    null,
    4,
  );
}

export function formatStackFile<T extends object>(existingItems: T[], input: StackInput) {
  const item = JSON.parse(formatStackItem(input)) as T;
  return JSON.stringify([...existingItems, item], null, 4);
}
