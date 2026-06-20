import type { BinId } from '../types'
import type { Bin } from './bin'
import { improve } from './improve'
import { design } from './design'
import { measure } from './measure'
import { grow } from './grow'
import { diagnose } from './diagnose'

export const bins: Record<BinId, Bin> = {
  improve,
  design,
  measure,
  grow,
  diagnose,
}

export const binOrder: BinId[] = ['improve', 'design', 'measure', 'grow', 'diagnose']

export type { Bin } from './bin'
