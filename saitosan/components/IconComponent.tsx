import { IconType } from 'react-icons'

interface Props {
  Icon: IconType
  size?: number
  color?: string
  className?: string
}

function IconComponent({ Icon, size = 24, color, className }: Props) {
  return <Icon size={size} color={color} className={className} />
}

export default IconComponent
