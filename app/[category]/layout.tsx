import { Pump } from '@/.basehub/react-pump'
import { SidebarFragment } from '@/basehub-helpers/fragments'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Sidebar } from '../_components/sidebar'
import { Container, Flex } from '@radix-ui/themes'

export default function Layout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { category: string }
}) {
  return (
    <Container
      size="4"
      px={{ initial: '5', md: '8' }}
      mt={{ initial: 'var(--header)', md: '0' }}
    >
      <Flex direction={{ initial: 'column', md: 'row' }}>
        <Pump
          queries={[{ pages: SidebarFragment }]}
          next={{ revalidate: 30 }}
          draft={draftMode().isEnabled}
        >
          {async ([data]) => {
            'use server'

            if (!data.pages.items.length) notFound()
            const category = data.pages.items.find(
              (page) => params.category === page._slug
            )
            if (!category) notFound()

            return (
              <Sidebar
                data={category.articles}
                level={0}
                category={`/${category._slug}`}
              />
            )
          }}
        </Pump>
        <Flex
          asChild
          minHeight="100vh"
          width="100%"
          align="start"
          justify="between"
          gapX="6"
          py="6"
        >
          <main>{children}</main>
        </Flex>
      </Flex>
    </Container>
  )
}
