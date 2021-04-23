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

import { ILookmlModel, ILookmlModelExplore, IGitBranch } from "@looker/sdk/lib/sdk/4.0/models"
import { SelectionInfoPacket, VisibleViewLookup } from "../../interfaces"
import { DetailedModel, DiagramError } from "../../../utils/fetchers"
import {
  SelectOptionProps,
} from "@looker/components"

export interface ViewOptionsProps {
  displayFieldType: any,
  hiddenToggle: any,
  viewVisible: any,
  setViewVisible: (visible: any) => void,
  handleHiddenToggle: (toggle: React.FormEvent<HTMLInputElement>) => void,
  setDisplayFieldType: (types: any) => void,
}

export interface DiagramSettingsProps {
  modelDetails: SelectOptionProps[],
  currentModel: DetailedModel,
  modelName: string,
  setModelError: (error: DiagramError) => void,
  setSelectedBranch: (branchName: string) => void,
  selectionInfo: SelectionInfoPacket,
  currentExplore: ILookmlModelExplore,
  diagramExplore: string,
  setSelectionInfo: (info: SelectionInfoPacket) => void,
  setViewVisible: (visible: VisibleViewLookup) => void,
  setZoomFactor: (zoom: number) => void,
  setViewPosition: (info: any) => void,
  setMinimapUntoggled: (toggle: boolean) => void,
  setMinimapEnabled: (toggle: boolean) => void,
}

 export interface ExploreDropdown {
  value: string;
  label: string;
}

