import * as React from 'react';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
export declare type FormCheckType = 'checkbox' | 'radio' | 'switch';
export interface FormCheckProps extends BsPrefixProps, React.InputHTMLAttributes<HTMLInputElement> {
    inline?: boolean;
    disabled?: boolean;
    label?: React.ReactNode;
    type?: FormCheckType;
    isValid?: boolean;
    isInvalid?: boolean;
    feedbackTooltip?: boolean;
    feedback?: React.ReactNode;
    bsSwitchPrefix?: string;
}
declare const _default: BsPrefixRefForwardingComponent<"input", FormCheckProps> & {
    Input: BsPrefixRefForwardingComponent<"input", import("./FormCheckInput").FormCheckInputProps>;
    Label: React.ForwardRefExoticComponent<import("./FormCheckLabel").FormCheckLabelProps & React.RefAttributes<HTMLLabelElement>>;
};
export default _default;
