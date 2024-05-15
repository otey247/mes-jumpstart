// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Example } from "./Example";

import styles from "./Example.module.css";

export type ExampleModel = {
    text: string;
    value: string;
};

const EXAMPLES: ExampleModel[] = [
    { text: "How does Azure OpenAI ensure data privacy?", value: "How does Azure OpenAI ensure data privacy?" },
    { text: "How does Azure OpenAI Service's pricing work?", value: "How does Azure OpenAI Service's pricing work?" },
    { text: "Can you explain the process and benefits of fine-tuning?", value: "Can you explain the process and benefits of fine-tuning?" }
];

interface Props {
    onExampleClicked: (value: string) => void;
}

export const ExampleList = ({ onExampleClicked }: Props) => {
    return (
        <ul className={styles.examplesNavList}>
            {EXAMPLES.map((x, i) => (
                <li key={i}>
                    <Example text={x.text} value={x.value} onClick={onExampleClicked} />
                </li>
            ))}
        </ul>
    );
};
