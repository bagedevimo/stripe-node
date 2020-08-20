// File generated from our OpenAPI spec
declare module 'stripe' {
  namespace Stripe {
    /**
     * The SetupIntent object.
     */
    interface SetupIntent {
      /**
       * Unique identifier for the object.
       */
      id: string;

      /**
       * String representing the object's type. Objects of the same type share the same value.
       */
      object: 'setup_intent';

      /**
       * ID of the Connect application that created the SetupIntent.
       */
      application: string | Stripe.Application | null;

      /**
       * Reason for cancellation of this SetupIntent, one of `abandoned`, `requested_by_customer`, or `duplicate`.
       */
      cancellation_reason: SetupIntent.CancellationReason | null;

      /**
       * The client secret of this SetupIntent. Used for client-side retrieval using a publishable key.
       *
       * The client secret can be used to complete payment setup from your frontend. It should not be stored, logged, embedded in URLs, or exposed to anyone other than the customer. Make sure that you have TLS enabled on any page that includes the client secret.
       */
      client_secret: string | null;

      /**
       * Time at which the object was created. Measured in seconds since the Unix epoch.
       */
      created: number;

      /**
       * ID of the Customer this SetupIntent belongs to, if one exists.
       *
       * If present, the SetupIntent's payment method will be attached to the Customer on successful setup. Payment methods attached to other Customers cannot be used with this SetupIntent.
       */
      customer: string | Stripe.Customer | Stripe.DeletedCustomer | null;

      /**
       * An arbitrary string attached to the object. Often useful for displaying to users.
       */
      description: string | null;

      /**
       * The error encountered in the previous SetupIntent confirmation.
       */
      last_setup_error: SetupIntent.LastSetupError | null;

      /**
       * Has the value `true` if the object exists in live mode or the value `false` if the object exists in test mode.
       */
      livemode: boolean;

      /**
       * ID of the multi use Mandate generated by the SetupIntent.
       */
      mandate: string | Stripe.Mandate | null;

      /**
       * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format.
       */
      metadata: Metadata;

      /**
       * If present, this property tells you what actions you need to take in order for your customer to continue payment setup.
       */
      next_action: SetupIntent.NextAction | null;

      /**
       * The account (if any) for which the setup is intended.
       */
      on_behalf_of: string | Stripe.Account | null;

      /**
       * ID of the payment method used with this SetupIntent.
       */
      payment_method: string | Stripe.PaymentMethod | null;

      /**
       * Payment-method-specific configuration for this SetupIntent.
       */
      payment_method_options: SetupIntent.PaymentMethodOptions | null;

      /**
       * The list of payment method types (e.g. card) that this SetupIntent is allowed to set up.
       */
      payment_method_types: Array<string>;

      /**
       * ID of the single_use Mandate generated by the SetupIntent.
       */
      single_use_mandate: string | Stripe.Mandate | null;

      /**
       * [Status](https://stripe.com/docs/payments/intents#intent-statuses) of this SetupIntent, one of `requires_payment_method`, `requires_confirmation`, `requires_action`, `processing`, `canceled`, or `succeeded`.
       */
      status: SetupIntent.Status;

      /**
       * Indicates how the payment method is intended to be used in the future.
       *
       * Use `on_session` if you intend to only reuse the payment method when the customer is in your checkout flow. Use `off_session` if your customer may or may not be in your checkout flow. If not provided, this value defaults to `off_session`.
       */
      usage: string;
    }

    namespace SetupIntent {
      type CancellationReason =
        | 'abandoned'
        | 'duplicate'
        | 'requested_by_customer';

      interface LastSetupError {
        /**
         * For card errors, the ID of the failed charge.
         */
        charge?: string;

        /**
         * For some errors that could be handled programmatically, a short string indicating the [error code](https://stripe.com/docs/error-codes) reported.
         */
        code?: string;

        /**
         * For card errors resulting from a card issuer decline, a short string indicating the [card issuer's reason for the decline](https://stripe.com/docs/declines#issuer-declines) if they provide one.
         */
        decline_code?: string;

        /**
         * A URL to more information about the [error code](https://stripe.com/docs/error-codes) reported.
         */
        doc_url?: string;

        /**
         * A human-readable message providing more details about the error. For card errors, these messages can be shown to your users.
         */
        message?: string;

        /**
         * If the error is parameter-specific, the parameter related to the error. For example, you can use this to display a message near the correct form field.
         */
        param?: string;

        /**
         * A PaymentIntent guides you through the process of collecting a payment from your customer.
         * We recommend that you create exactly one PaymentIntent for each order or
         * customer session in your system. You can reference the PaymentIntent later to
         * see the history of payment attempts for a particular session.
         *
         * A PaymentIntent transitions through
         * [multiple statuses](https://stripe.com/docs/payments/intents#intent-statuses)
         * throughout its lifetime as it interfaces with Stripe.js to perform
         * authentication flows and ultimately creates at most one successful charge.
         *
         * Related guide: [Payment Intents API](https://stripe.com/docs/payments/payment-intents).
         */
        payment_intent?: Stripe.PaymentIntent;

        /**
         * PaymentMethod objects represent your customer's payment instruments.
         * They can be used with [PaymentIntents](https://stripe.com/docs/payments/payment-intents) to collect payments or saved to
         * Customer objects to store instrument details for future payments.
         *
         * Related guides: [Payment Methods](https://stripe.com/docs/payments/payment-methods) and [More Payment Scenarios](https://stripe.com/docs/payments/more-payment-scenarios).
         */
        payment_method?: Stripe.PaymentMethod;

        /**
         * A SetupIntent guides you through the process of setting up and saving a customer's payment credentials for future payments.
         * For example, you could use a SetupIntent to set up and save your customer's card without immediately collecting a payment.
         * Later, you can use [PaymentIntents](https://stripe.com/docs/api#payment_intents) to drive the payment flow.
         *
         * Create a SetupIntent as soon as you're ready to collect your customer's payment credentials.
         * Do not maintain long-lived, unconfirmed SetupIntents as they may no longer be valid.
         * The SetupIntent then transitions through multiple [statuses](https://stripe.com/docs/payments/intents#intent-statuses) as it guides
         * you through the setup process.
         *
         * Successful SetupIntents result in payment credentials that are optimized for future payments.
         * For example, cardholders in [certain regions](https://stripe.com/guides/strong-customer-authentication) may need to be run through
         * [Strong Customer Authentication](https://stripe.com/docs/strong-customer-authentication) at the time of payment method collection
         * in order to streamline later [off-session payments](https://stripe.com/docs/payments/setup-intents).
         * If the SetupIntent is used with a [Customer](https://stripe.com/docs/api#setup_intent_object-customer), upon success,
         * it will automatically attach the resulting payment method to that Customer.
         * We recommend using SetupIntents or [setup_future_usage](https://stripe.com/docs/api#payment_intent_object-setup_future_usage) on
         * PaymentIntents to save payment methods in order to prevent saving invalid or unoptimized payment methods.
         *
         * By using SetupIntents, you ensure that your customers experience the minimum set of required friction,
         * even as regulations change over time.
         *
         * Related guide: [Setup Intents API](https://stripe.com/docs/payments/setup-intents).
         */
        setup_intent?: Stripe.SetupIntent;

        source?: CustomerSource;

        /**
         * The type of error returned. One of `api_connection_error`, `api_error`, `authentication_error`, `card_error`, `idempotency_error`, `invalid_request_error`, or `rate_limit_error`
         */
        type: LastSetupError.Type;
      }

      namespace LastSetupError {
        type Type =
          | 'api_connection_error'
          | 'api_error'
          | 'authentication_error'
          | 'card_error'
          | 'idempotency_error'
          | 'invalid_request_error'
          | 'rate_limit_error';
      }

      interface NextAction {
        redirect_to_url?: NextAction.RedirectToUrl;

        /**
         * Type of the next action to perform, one of `redirect_to_url` or `use_stripe_sdk`.
         */
        type: string;

        /**
         * When confirming a SetupIntent with Stripe.js, Stripe.js depends on the contents of this dictionary to invoke authentication flows. The shape of the contents is subject to change and is only intended to be used by Stripe.js.
         */
        use_stripe_sdk?: NextAction.UseStripeSdk;
      }

      namespace NextAction {
        interface RedirectToUrl {
          /**
           * If the customer does not exit their browser while authenticating, they will be redirected to this specified URL after completion.
           */
          return_url: string | null;

          /**
           * The URL you must redirect your customer to in order to authenticate.
           */
          url: string | null;
        }

        interface UseStripeSdk {}
      }

      interface PaymentMethodOptions {
        card?: PaymentMethodOptions.Card;
      }

      namespace PaymentMethodOptions {
        interface Card {
          /**
           * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
           */
          request_three_d_secure: Card.RequestThreeDSecure | null;
        }

        namespace Card {
          type RequestThreeDSecure = 'any' | 'automatic' | 'challenge_only';
        }
      }

      type Status =
        | 'canceled'
        | 'processing'
        | 'requires_action'
        | 'requires_confirmation'
        | 'requires_payment_method'
        | 'succeeded';
    }

    interface SetupIntentCreateParams {
      /**
       * Set to `true` to attempt to confirm this SetupIntent immediately. This parameter defaults to `false`. If the payment method attached is a card, a return_url may be provided in case additional authentication is required.
       */
      confirm?: boolean;

      /**
       * ID of the Customer this SetupIntent belongs to, if one exists.
       *
       * If present, the SetupIntent's payment method will be attached to the Customer on successful setup. Payment methods attached to other Customers cannot be used with this SetupIntent.
       */
      customer?: string;

      /**
       * An arbitrary string attached to the object. Often useful for displaying to users.
       */
      description?: string;

      /**
       * Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;

      /**
       * This hash contains details about the Mandate to create. This parameter can only be used with [`confirm=true`](https://stripe.com/docs/api/setup_intents/create#create_setup_intent-confirm).
       */
      mandate_data?: SetupIntentCreateParams.MandateData;

      /**
       * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
       */
      metadata?: MetadataParam;

      /**
       * The Stripe account ID for which this SetupIntent is created.
       */
      on_behalf_of?: string;

      /**
       * ID of the payment method (a PaymentMethod, Card, or saved Source object) to attach to this SetupIntent.
       */
      payment_method?: string;

      /**
       * Payment-method-specific configuration for this SetupIntent.
       */
      payment_method_options?: SetupIntentCreateParams.PaymentMethodOptions;

      /**
       * The list of payment method types (e.g. card) that this SetupIntent is allowed to use. If this is not provided, defaults to ["card"].
       */
      payment_method_types?: Array<string>;

      /**
       * The URL to redirect your customer back to after they authenticate or cancel their payment on the payment method's app or site. If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme. This parameter can only be used with [`confirm=true`](https://stripe.com/docs/api/setup_intents/create#create_setup_intent-confirm).
       */
      return_url?: string;

      /**
       * If this hash is populated, this SetupIntent will generate a single_use Mandate on success.
       */
      single_use?: SetupIntentCreateParams.SingleUse;

      /**
       * Indicates how the payment method is intended to be used in the future. If not provided, this value defaults to `off_session`.
       */
      usage?: SetupIntentCreateParams.Usage;
    }

    namespace SetupIntentCreateParams {
      interface MandateData {
        /**
         * This hash contains details about the customer acceptance of the Mandate.
         */
        customer_acceptance: MandateData.CustomerAcceptance;
      }

      namespace MandateData {
        interface CustomerAcceptance {
          /**
           * The time at which the customer accepted the Mandate.
           */
          accepted_at?: number;

          /**
           * If this is a Mandate accepted offline, this hash contains details about the offline acceptance.
           */
          offline?: CustomerAcceptance.Offline;

          /**
           * If this is a Mandate accepted online, this hash contains details about the online acceptance.
           */
          online?: CustomerAcceptance.Online;

          /**
           * The type of customer acceptance information included with the Mandate. One of `online` or `offline`.
           */
          type: CustomerAcceptance.Type;
        }

        namespace CustomerAcceptance {
          interface Offline {}

          interface Online {
            /**
             * The IP address from which the Mandate was accepted by the customer.
             */
            ip_address: string;

            /**
             * The user agent of the browser from which the Mandate was accepted by the customer.
             */
            user_agent: string;
          }

          type Type = 'offline' | 'online';
        }
      }

      interface PaymentMethodOptions {
        /**
         * Configuration for any card setup attempted on this SetupIntent.
         */
        card?: PaymentMethodOptions.Card;
      }

      namespace PaymentMethodOptions {
        interface Card {
          /**
           * When specified, this parameter signals that a card has been collected
           * as MOTO (Mail Order Telephone Order) and thus out of scope for SCA. This
           * parameter can only be provided during confirmation.
           */
          moto?: boolean;

          /**
           * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
           */
          request_three_d_secure?: Card.RequestThreeDSecure;
        }

        namespace Card {
          type RequestThreeDSecure = 'any' | 'automatic';
        }
      }

      interface SingleUse {
        /**
         * Amount the customer is granting permission to collect later. A positive integer representing how much to charge in the [smallest currency unit](https://stripe.com/docs/currencies#zero-decimal) (e.g., 100 cents to charge $1.00 or 100 to charge ¥100, a zero-decimal currency). The minimum amount is $0.50 US or [equivalent in charge currency](https://stripe.com/docs/currencies#minimum-and-maximum-charge-amounts). The amount value supports up to eight digits (e.g., a value of 99999999 for a USD charge of $999,999.99).
         */
        amount: number;

        /**
         * Three-letter [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html), in lowercase. Must be a [supported currency](https://stripe.com/docs/currencies).
         */
        currency: string;
      }

      type Usage = 'off_session' | 'on_session';
    }

    interface SetupIntentRetrieveParams {
      /**
       * The client secret of the SetupIntent. Required if a publishable key is used to retrieve the SetupIntent.
       */
      client_secret?: string;

      /**
       * Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;
    }

    interface SetupIntentUpdateParams {
      /**
       * ID of the Customer this SetupIntent belongs to, if one exists.
       *
       * If present, the SetupIntent's payment method will be attached to the Customer on successful setup. Payment methods attached to other Customers cannot be used with this SetupIntent.
       */
      customer?: string;

      /**
       * An arbitrary string attached to the object. Often useful for displaying to users.
       */
      description?: string;

      /**
       * Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;

      /**
       * Set of [key-value pairs](https://stripe.com/docs/api/metadata) that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to `metadata`.
       */
      metadata?: MetadataParam | null;

      /**
       * ID of the payment method (a PaymentMethod, Card, or saved Source object) to attach to this SetupIntent.
       */
      payment_method?: string;

      /**
       * Payment-method-specific configuration for this SetupIntent.
       */
      payment_method_options?: SetupIntentUpdateParams.PaymentMethodOptions;

      /**
       * The list of payment method types (e.g. card) that this SetupIntent is allowed to set up. If this is not provided, defaults to ["card"].
       */
      payment_method_types?: Array<string>;
    }

    namespace SetupIntentUpdateParams {
      interface PaymentMethodOptions {
        /**
         * Configuration for any card setup attempted on this SetupIntent.
         */
        card?: PaymentMethodOptions.Card;
      }

      namespace PaymentMethodOptions {
        interface Card {
          /**
           * When specified, this parameter signals that a card has been collected
           * as MOTO (Mail Order Telephone Order) and thus out of scope for SCA. This
           * parameter can only be provided during confirmation.
           */
          moto?: boolean;

          /**
           * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
           */
          request_three_d_secure?: Card.RequestThreeDSecure;
        }

        namespace Card {
          type RequestThreeDSecure = 'any' | 'automatic';
        }
      }
    }

    interface SetupIntentListParams extends PaginationParams {
      /**
       * A filter on the list, based on the object `created` field. The value can be a string with an integer Unix timestamp, or it can be a dictionary with a number of different query options.
       */
      created?: RangeQueryParam | number;

      /**
       * Only return SetupIntents for the customer specified by this customer ID.
       */
      customer?: string;

      /**
       * Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;

      /**
       * Only return SetupIntents associated with the specified payment method.
       */
      payment_method?: string;
    }

    interface SetupIntentCancelParams {
      /**
       * Reason for canceling this SetupIntent. Possible values are `abandoned`, `requested_by_customer`, or `duplicate`
       */
      cancellation_reason?: SetupIntentCancelParams.CancellationReason;

      /**
       * Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;
    }

    namespace SetupIntentCancelParams {
      type CancellationReason =
        | 'abandoned'
        | 'duplicate'
        | 'requested_by_customer';
    }

    interface SetupIntentConfirmParams {
      /**
       * Specifies which fields in the response should be expanded.
       */
      expand?: Array<string>;

      /**
       * This hash contains details about the Mandate to create
       */
      mandate_data?:
        | SetupIntentConfirmParams.MandateData1
        | SetupIntentConfirmParams.MandateData2;

      /**
       * ID of the payment method (a PaymentMethod, Card, or saved Source object) to attach to this SetupIntent.
       */
      payment_method?: string;

      /**
       * Payment-method-specific configuration for this SetupIntent.
       */
      payment_method_options?: SetupIntentConfirmParams.PaymentMethodOptions;

      /**
       * The URL to redirect your customer back to after they authenticate on the payment method's app or site.
       * If you'd prefer to redirect to a mobile application, you can alternatively supply an application URI scheme.
       * This parameter is only used for cards and other redirect-based payment methods.
       */
      return_url?: string;
    }

    namespace SetupIntentConfirmParams {
      interface MandateData1 {
        /**
         * This hash contains details about the customer acceptance of the Mandate.
         */
        customer_acceptance: MandateData1.CustomerAcceptance;
      }

      namespace MandateData1 {
        interface CustomerAcceptance {
          /**
           * The time at which the customer accepted the Mandate.
           */
          accepted_at?: number;

          /**
           * If this is a Mandate accepted offline, this hash contains details about the offline acceptance.
           */
          offline?: CustomerAcceptance.Offline;

          /**
           * If this is a Mandate accepted online, this hash contains details about the online acceptance.
           */
          online?: CustomerAcceptance.Online;

          /**
           * The type of customer acceptance information included with the Mandate. One of `online` or `offline`.
           */
          type: CustomerAcceptance.Type;
        }

        namespace CustomerAcceptance {
          interface Offline {}

          interface Online {
            /**
             * The IP address from which the Mandate was accepted by the customer.
             */
            ip_address: string;

            /**
             * The user agent of the browser from which the Mandate was accepted by the customer.
             */
            user_agent: string;
          }

          type Type = 'offline' | 'online';
        }
      }

      interface MandateData2 {
        /**
         * This hash contains details about the customer acceptance of the Mandate.
         */
        customer_acceptance: MandateData2.CustomerAcceptance;
      }

      namespace MandateData2 {
        interface CustomerAcceptance {
          /**
           * If this is a Mandate accepted online, this hash contains details about the online acceptance.
           */
          online: CustomerAcceptance.Online;

          /**
           * The type of customer acceptance information included with the Mandate.
           */
          type: 'online';
        }

        namespace CustomerAcceptance {
          interface Online {
            /**
             * The IP address from which the Mandate was accepted by the customer.
             */
            ip_address?: string;

            /**
             * The user agent of the browser from which the Mandate was accepted by the customer.
             */
            user_agent?: string;
          }
        }
      }

      interface PaymentMethodOptions {
        /**
         * Configuration for any card setup attempted on this SetupIntent.
         */
        card?: PaymentMethodOptions.Card;
      }

      namespace PaymentMethodOptions {
        interface Card {
          /**
           * When specified, this parameter signals that a card has been collected
           * as MOTO (Mail Order Telephone Order) and thus out of scope for SCA. This
           * parameter can only be provided during confirmation.
           */
          moto?: boolean;

          /**
           * We strongly recommend that you rely on our SCA Engine to automatically prompt your customers for authentication based on risk level and [other requirements](https://stripe.com/docs/strong-customer-authentication). However, if you wish to request 3D Secure based on logic from your own fraud engine, provide this option. Permitted values include: `automatic` or `any`. If not provided, defaults to `automatic`. Read our guide on [manually requesting 3D Secure](https://stripe.com/docs/payments/3d-secure#manual-three-ds) for more information on how this configuration interacts with Radar and our SCA Engine.
           */
          request_three_d_secure?: Card.RequestThreeDSecure;
        }

        namespace Card {
          type RequestThreeDSecure = 'any' | 'automatic';
        }
      }
    }

    class SetupIntentsResource {
      /**
       * Creates a SetupIntent object.
       *
       * After the SetupIntent is created, attach a payment method and [confirm](https://stripe.com/docs/api/setup_intents/confirm)
       * to collect any required permissions to charge the payment method later.
       */
      create(
        params?: SetupIntentCreateParams,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;
      create(
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;

      /**
       * Retrieves the details of a SetupIntent that has previously been created.
       *
       * Client-side retrieval using a publishable key is allowed when the client_secret is provided in the query string.
       *
       * When retrieved with a publishable key, only a subset of properties will be returned. Please refer to the [SetupIntent](https://stripe.com/docs/api#setup_intent_object) object reference for more details.
       */
      retrieve(
        id: string,
        params?: SetupIntentRetrieveParams,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;
      retrieve(
        id: string,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;

      /**
       * Updates a SetupIntent object.
       */
      update(
        id: string,
        params?: SetupIntentUpdateParams,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;

      /**
       * Returns a list of SetupIntents.
       */
      list(
        params?: SetupIntentListParams,
        options?: RequestOptions
      ): ApiListPromise<Stripe.SetupIntent>;
      list(options?: RequestOptions): ApiListPromise<Stripe.SetupIntent>;

      /**
       * A SetupIntent object can be canceled when it is in one of these statuses: requires_payment_method, requires_confirmation, or requires_action.
       *
       * Once canceled, setup is abandoned and any operations on the SetupIntent will fail with an error.
       */
      cancel(
        id: string,
        params?: SetupIntentCancelParams,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;
      cancel(
        id: string,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;

      /**
       * Confirm that your customer intends to set up the current or
       * provided payment method. For example, you would confirm a SetupIntent
       * when a customer hits the “Save” button on a payment method management
       * page on your website.
       *
       * If the selected payment method does not require any additional
       * steps from the customer, the SetupIntent will transition to the
       * succeeded status.
       *
       * Otherwise, it will transition to the requires_action status and
       * suggest additional actions via next_action. If setup fails,
       * the SetupIntent will transition to the
       * requires_payment_method status.
       */
      confirm(
        id: string,
        params?: SetupIntentConfirmParams,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;
      confirm(
        id: string,
        options?: RequestOptions
      ): Promise<Stripe.Response<Stripe.SetupIntent>>;
    }
  }
}
