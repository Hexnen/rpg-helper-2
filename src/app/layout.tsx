import ThemeRegistry from '@/components/ThemeRegistry'
import FontLoader from '@/components/FontLoader'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'RPG Helper',
  description: 'Tabletop RPG Campaign Management Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <FontLoader>
          <ThemeRegistry>
            {children}
          </ThemeRegistry>
        </FontLoader>
      </body>
    </html>
  )
} 