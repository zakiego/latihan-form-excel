/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxProps, Flex, Icon, useCheckbox } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";

// https://chakra-ui.com/docs/hooks/use-checkbox#usage
export const CustomCheckbox = (props: CheckboxProps) => {
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(props);

  return (
    <chakra.label
      display="inline-flex"
      flexDirection="row"
      alignItems="center"
      cursor="pointer"
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />
      <Flex
        alignItems="center"
        justifyContent="center"
        border={state.isChecked ? "none" : "2px solid"}
        borderColor="inherit"
        w={4}
        h={4}
        {...getCheckboxProps()}
      >
        {state.isChecked && (
          <Icon
            as={CheckIcon}
            color="white"
            px="1px"
            w="full"
            h="full"
            bg="blue.500"
          />
        )}
      </Flex>
    </chakra.label>
  );
};

// https://github.com/chakra-ui/chakra-ui/blob/7746c3c6c82803e7063bb3ba62d4d1f35183102e/packages/checkbox/src/checkbox-icon.tsx#L18
const CheckIcon = (props: any) => (
  <svg
    width="1.2em"
    viewBox="0 0 12 10"
    variants={{
      unchecked: {
        opacity: 0,
        strokeDashoffset: 16,
      },
      checked: {
        opacity: 1,
        strokeDashoffset: 0,
        transition: { duration: 0.2 },
      },
    }}
    style={{
      fill: "none",
      strokeWidth: 2,
      stroke: "currentColor",
      strokeDasharray: 16,
    }}
    {...props}
  >
    <polyline points="1.5 6 4.5 9 10.5 1" />
  </svg>
);
