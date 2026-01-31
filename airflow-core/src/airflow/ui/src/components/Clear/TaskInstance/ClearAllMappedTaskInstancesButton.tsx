/*!
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import { Box, Button, useDisclosure } from "@chakra-ui/react";
import { useHotkeys } from "react-hotkeys-hook";
import { useTranslation } from "react-i18next";
import { CgRedo } from "react-icons/cg";

import { Tooltip } from "src/components/ui";

import ClearTaskInstanceDialog from "./ClearTaskInstanceDialog";

type Props = {
  readonly dagId: string;
  readonly dagRunId: string;
  readonly isHotkeyEnabled?: boolean;
  readonly taskId: string;
  readonly withText?: boolean;
};

const ClearAllMappedTaskInstancesButton = ({ dagId, dagRunId, isHotkeyEnabled = false, taskId, withText = true }: Props) => {
  const { onClose, onOpen, open } = useDisclosure();
  const { t: translate } = useTranslation();

  useHotkeys(
    "shift+c",
    () => {
      onOpen();
    },
    { enabled: isHotkeyEnabled },
  );

  return (
    <Tooltip
      closeDelay={100}
      content={
        isHotkeyEnabled
          ? translate("dags:runAndTaskActions.clearAllMapped.buttonTooltip")
          : translate("dags:runAndTaskActions.clearAllMapped.button")
      }
      openDelay={100}
    >
      <Box>
        <Button
          aria-label={translate("dags:runAndTaskActions.clearAllMapped.button")}
          colorPalette="brand"
          onClick={onOpen}
          size="sm"
          variant="ghost"
        >
          <CgRedo />
          {withText ? ` ${translate("dags:runAndTaskActions.clearAllMapped.button")}` : null}
        </Button>

        {open ? (
          <ClearTaskInstanceDialog
            allMapped={true}
            dagId={dagId}
            dagRunId={dagRunId}
            onClose={onClose}
            open={open}
            taskId={taskId}
          />
        ) : undefined}
      </Box>
    </Tooltip>
  );
};

export default ClearAllMappedTaskInstancesButton;
