/*

 MIT License

 Copyright (c) 2021 Looker Data Sciences, Inc.

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

 */
import {
  ILookmlModelExploreJoins,
  ILookmlModelExplore
} from '@looker/sdk/lib/4.0/models'
import { DiagramField } from './types'

/**
 * Returns properly formatted DiagramJoin for PKs
 * @param join - looker join obj
 * @param pkTableRef - joined diagram table fields
 * @param pkFieldIndex - joined diagram table index
 */
export function getPkJoinPathObj(
  join: ILookmlModelExploreJoins,
  pkTableRef: DiagramField[],
  pkFieldIndex: number
) {
  return {
    viewName: join.name,
    fieldIndex: pkFieldIndex,
    selector: pkTableRef[pkFieldIndex].name.replace('.', '-'),
    type: 'core',
    joinName: join.name,
    joinObj: join
  }
}

/**
 * Returns properly formatted DiagramJoin for base table fields
 * @param join - looker join obj
 * @param baseTableId - base table name
 * @param baseTableRef - base table fields
 * @param fieldIndex - base table field index
 */
export function getBaseJoinPathObj(
  join: ILookmlModelExploreJoins,
  baseTableId: string,
  baseTableRef: DiagramField[],
  fieldIndex: number
) {
  return {
    viewName: baseTableId,
    fieldIndex: fieldIndex,
    selector: baseTableRef[fieldIndex].name.replace('.', '-'),
    type: 'core',
    joinName: join.name,
    joinObj: join
  }
}

/**
 * Returns properly formatted DiagramJoin for fields found in join sql
 * @param joinFieldArr - the view name / field name split string
 * @param fieldIndex - index of field in table
 * @param field - field name
 * @param join - looker join obj
 */
export function getSqlJoinPathObj(
  joinFieldArr: string[],
  fieldIndex: number,
  field: string,
  join: ILookmlModelExploreJoins
) {
  return {
    viewName: joinFieldArr[0],
    fieldIndex: fieldIndex,
    selector: field.replace('.', '-'),
    type: 'core',
    joinName: join.name,
    joinObj: join
  }
}

/**
 * Returns properly formatted DiagramJoin for joined table header
 * @param join - looker join obj
 */
export function getJoinPathObj(join: ILookmlModelExploreJoins) {
  return {
    viewName: join.name,
    fieldIndex: 0,
    selector: join.name.replace('.', '-'),
    type: 'core',
    joinName: join.name,
    joinObj: join
  }
}

/**
 * Returns properly formatted DiagramJoin for explore table header
 * @param explore - looker explore obj
 * @param join - looker join obj
 */
export function getExploreJoinPathObj(
  explore: ILookmlModelExplore,
  join: ILookmlModelExploreJoins
) {
  return {
    viewName: explore.name,
    fieldIndex: 0,
    selector: join.name.replace('.', '-'),
    type: 'core',
    joinName: join.name,
    joinObj: join
  }
}
