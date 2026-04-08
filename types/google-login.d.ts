export {};

declare global {
  interface CredentialResponse {
    credential?: string;
    clientId?: string;
    select_by?: string;
  }

  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string;
            callback: (response: CredentialResponse) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
            prompt_parent_id?: string;
            itp_support?: boolean;
          }) => void;

          prompt: () => void;

          cancel: () => void;

          renderButton?: (
            parent: HTMLElement,
            options: Record<string, unknown>
          ) => void;
        };
      };
    };
  }
}