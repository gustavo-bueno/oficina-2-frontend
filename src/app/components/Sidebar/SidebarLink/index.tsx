import Link from 'next/link'
import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'

type SidebarLinkProps = {
  href: string
  children: string
  active: boolean
  icon: ReactNode
  onClick?: () => void
} 

const sidebarLink = tv({
  base: 'text-[18px] font-medium flex items-center gap-[12px]',
  variants: {
    status: {
      active: 'text-primary font-bold',
      unactive: 'text-darkGrey'
    }
  }
})

const SidebarLink = ({
 href,
 children,
 icon,
 active,
 onClick
}: SidebarLinkProps) => {

  return (
    <Link href={href} className={sidebarLink({ status: active ? 'active' : 'unactive' })} onClick={onClick}>
      {icon}
      {children}
    </Link>
  )
}

export default SidebarLink