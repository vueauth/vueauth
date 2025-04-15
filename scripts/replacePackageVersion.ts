import { readFileSync, writeFileSync } from 'node:fs'

function escapeRegExp(str: string): string {
  // $& means the whole matched string
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function replacePackageVersion(
  filePath: string,
  packageNameWithQuotes: string,
  newVersion: string
): string {
  const fileContent = readFileSync(filePath, { encoding: 'utf-8' })

  const escapedPackageName = escapeRegExp(packageNameWithQuotes);
  const regex = new RegExp(
    `(${escapedPackageName}\\s*:\\s*)(['"])[^'"]*\\2`,
    'g'
  );

  const replacementString = `$1$2${newVersion}$2`;

  const updatedContent = fileContent.replace(regex, replacementString);

  if (updatedContent === fileContent) {
    console.warn(`Warning: Package key ${packageNameWithQuotes} not found in the provided content, or version was already ${newVersion}. No changes made.`);
  }

  writeFileSync(filePath, updatedContent, { encoding: 'utf-8' })

  return updatedContent;
}