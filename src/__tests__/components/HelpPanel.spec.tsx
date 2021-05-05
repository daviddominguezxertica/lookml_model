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

import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithTheme } from '@looker/components-test-utils'
import {  ExtensionContext2, ExtensionContextData2 } from "@looker/extension-sdk-react"
import {  LookerHostData,  registerHostApi, ExtensionHostApi } from "@looker/extension-sdk"
import { Looker40SDK } from '@looker/sdk'

import { HelpPanel } from '../../components/DiagramFrame/FramePanels/HelpPanel'

describe('HelpPanel', () => {

  // TODO - create a renderWithExtensionContext helper method with this ugly mocking
  const extensionSDK = {
    lookerHostData: {} as Readonly<LookerHostData>,
    error: (_: ErrorEvent) => {}
  } as ExtensionHostApi
  registerHostApi(extensionSDK)
  const extensionContext: ExtensionContextData2<Looker40SDK> = {
    extensionSDK,
    coreSDK: {} as Looker40SDK,
    route: ''
  }

  test('it renders documentation', () => {
    renderWithTheme(
      <ExtensionContext2.Provider value={extensionContext}>
        <HelpPanel />
      </ExtensionContext2.Provider>
    )
    expect(
      screen.getByText(
        'The base view is indicated by a dark blue header. In each view table, dimension rows are white; measure rows are light orange.'
      )
    ).toBeInTheDocument()
  })
})
