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

import React from "react"
import {
  SpaceVertical,
  Heading,
  Divider,
  RadioGroup,
  FieldToggleSwitch,
  Label,
  Flex,
  FlexItem,
  Truncate,
  Tooltip,
  ButtonTransparent,
  Icon,
  theme
} from "@looker/components"
import {ViewOptionsProps} from "./types"
import {ViewList, ViewListItem, ViewButton, SettingsPanel} from "./FramePanelsHelpers"
import {getViewListItemColor} from "./utils"

export const ViewOptions: React.FC<ViewOptionsProps> = ({ 
  displayFieldType,
  hiddenToggle,
  viewVisible,
  setViewVisible,
  handleHiddenToggle,
  setDisplayFieldType,
 }) => {

  return (
    <SettingsPanel width="275px" px="medium" py="large">
      <SpaceVertical>
        <Heading fontSize="large">View Options</Heading>
        <Flex width="250px" flexDirection="column">
          <FlexItem pb="small">
            <Label>Fields to Display</Label>
            <RadioGroup 
              pt="small" 
              name="fieldScopeSelection" 
              value={displayFieldType}
              onChange={setDisplayFieldType}
              options={[{label: "All fields", value: "all"}, {label: "Fields with joins", value: "joined"}]} />
          </FlexItem>
          <Divider appearance="light" />
          <FlexItem py="xsmall">
            <Flex>
              <FlexItem>
                <FieldToggleSwitch onChange={handleHiddenToggle} on={hiddenToggle} label="Hide hidden fields    " />
              </FlexItem>
              <FlexItem ml="xxxlarge">
                <Tooltip content="Enabled by default, this toggle hides fields from the diagram that contain 'hidden: yes'.">
                  <Icon size="xsmall" color="subdued" name="CircleInfoOutline"/>
                </Tooltip>
              </FlexItem>
            </Flex>
          </FlexItem>
          <Divider appearance="light" />
          <FlexItem pt="small">
            <Flex flexDirection="column">
              <FlexItem>
                <Flex alignItems="baseline">
                  <FlexItem flexBasis="25%">
                    <Label>Views</Label>
                  </FlexItem>
                  <FlexItem  pl="xxxlarge" flexBasis="75%">
                    <Flex>
                      <FlexItem>
                        <ButtonTransparent 
                          size="small"
                          onClick={(e: any) => {
                            let newViews: any = {}
                            Object.keys(viewVisible).map((d: any) => {
                              newViews[d] = false
                            })
                            setViewVisible(newViews)
                          }}
                        >Hide all</ButtonTransparent>
                      </FlexItem>
                      <FlexItem>
                        <ButtonTransparent size="small"
                          onClick={(e: any) => {
                            let newViews: any = {}
                            Object.keys(viewVisible).map((d: any) => {
                              newViews[d] = true
                            })
                            setViewVisible(newViews)
                          }}
                        >Show all</ButtonTransparent>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Flex>
              </FlexItem>
              <FlexItem>
                <ViewList>
                  {viewVisible && Object.keys(viewVisible).map((item: string, index: number) => {
                    return (
                      <ViewListItem key={`view-${index}`} style={{color: getViewListItemColor(viewVisible[item])}}>
                        <ViewButton
                              onClick={() => {
                                let newViews: any = {}
                                Object.assign(newViews, viewVisible)
                                newViews[item] = !viewVisible[item]
                                setViewVisible(newViews)
                              }}
                              value={item}
                            >
                        <Flex alignItems="center" justifyContent="space-between">
                          <FlexItem>
                              <Truncate>{item}</Truncate>
                          </FlexItem>
                          <FlexItem>
                            <Icon 
                              size="xxsmall"
                              name={viewVisible[item] ? "VisibilityOutline" : "VisibilityOff"}
                              color={viewVisible[item] ? theme.colors.text : theme.colors.text1} />
                          </FlexItem>
                        </Flex>
                        </ViewButton>
                      </ViewListItem>
                    )
                  })}
                </ViewList>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </SpaceVertical>
    </SettingsPanel>
  )
}
