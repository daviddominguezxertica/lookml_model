/*

 MIT License

 Copyright (c) 2020 Looker Data Sciences, Inc.

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

import { TABLE_VERTICAL_PADDING, TABLE_WIDTH, TABLE_DEGREE_STEP, TABLE_PADDING, TABLE_ROW_HEIGHT, DIAGRAM_FIELD_STROKE_WIDTH } from "../constants";
import {DiagramMetadata} from './types'

/**
 * generates diagrammable minimap metadata for a given, diagrammed explore
 * @param currentDimensions 
 */
export function generateMinimapDiagram(currentDimensions: DiagramMetadata) {
  let median: number
  let minDegree: number
  let maxDegree: number

  let maxLength = 0

  if (currentDimensions) {
    // figure out the horizontal breadth of diagram
    let currentDegrees = currentDimensions && Object.keys(currentDimensions.yOrderLookup).map((d: string)=>{return +d}).sort((a: number, b: number) => a - b)
    minDegree = currentDimensions && Math.min(...currentDegrees)
    maxDegree = currentDimensions && Math.max(...currentDegrees)
  
    let len = currentDegrees && currentDegrees.length
  
    let mid = currentDegrees && Math.ceil(len / 2);
    
    // figure out which degree is the middle
    median = ((len % 2) == 0) ? (currentDegrees[mid] + currentDegrees[mid - 1]) / 2 : currentDegrees[mid - 1];

    Object.keys(currentDimensions.yOrderLookup).forEach((d: string) => {
      let degreeTablesLength = currentDimensions.yOrderLookup[d].map((tableName: string) => {
        let undefModel = typeof(currentDimensions.tableData[tableName]) === "undefined"
        return undefModel || currentDimensions.tableData[tableName].length + TABLE_VERTICAL_PADDING
      }).reduce((a: number, b: number) => a + b, 0)
      if (degreeTablesLength > maxLength) {
        maxLength = degreeTablesLength
      }
    })
  }
  let verticalCheck = 150 / (maxLength * (TABLE_ROW_HEIGHT + DIAGRAM_FIELD_STROKE_WIDTH))
  let horizontalCheck = 300 / ((1 + Math.max(Math.abs(minDegree), Math.abs(maxDegree))) * (TABLE_PADDING+TABLE_WIDTH))
  let minimapScale = Math.min(verticalCheck, horizontalCheck)

  // shift to put the median degree in the middle
  let medianCorrection = median > 0 
  ? -1 * median * TABLE_PADDING
  : Math.abs(median) * TABLE_PADDING

  let minimapX = 150 - (TABLE_WIDTH / 2 * minimapScale) + (medianCorrection * minimapScale)
  let minimapY = (Math.max(Math.abs(minDegree), Math.abs(maxDegree)) + 1) * (TABLE_DEGREE_STEP * -1)

  // show minimap by default if degree > 2 or more than 40 rows
  let defaultMinimap = Math.max(Math.abs(minDegree), Math.abs(maxDegree)) > 2 || maxLength > 40 ? true : false

  return {
    scale: minimapScale, x: minimapX, y: minimapY, default: defaultMinimap
  }
}
