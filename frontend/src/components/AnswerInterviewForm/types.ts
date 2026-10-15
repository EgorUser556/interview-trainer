export type AnswerInterviewFormProps = {
    onSendAnswer: (answer: string) => void;
    isSaving: boolean;
    errorMessage: string | null;
};
