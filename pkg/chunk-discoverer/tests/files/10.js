/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = {
    /***/ 85971: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Bo: () => /* binding */ setService,
        /* harmony export */ K9: () => /* binding */ Services,
        /* harmony export */ NG: () => /* binding */ PluginServices,
        /* harmony export */ Vm: () => /* binding */ Messages,
        /* harmony export */ Z: () => /* binding */ setMessages,
        /* harmony export */ cr: () => /* binding */ setPluginServices,
        /* harmony export */ jg: () => /* binding */ setPluginMessages,
        /* harmony export */ yC: () => /* binding */ PluginMessages,
        /* harmony export */
      });
      let Services = null;
      let Messages = null;
      let PluginServices = null;
      let PluginMessages = null;
      function setService(rpc) {
        Services = rpc;
        Object.assign(globalThis, {
          Services: rpc,
        });
      }
      function setMessages(MaskMessage) {
        Messages = MaskMessage;
        Object.assign(globalThis, {
          Messages: MaskMessage,
        });
      }
      function setPluginServices(rpc) {
        PluginServices = rpc;
        Object.assign(globalThis, {
          PluginServices: rpc,
        });
      }
      function setPluginMessages(message) {
        PluginMessages = message;
        Object.assign(globalThis, {
          PluginMessages: message,
        });
      }

      /***/
    },

    /***/ 23730: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      // EXPORTS
      __webpack_require__.d(__webpack_exports__, {
        QG: () => /* reexport */ IntegratedDashboard,
        Gp: () => /* reexport */ addDashboardI18N,
        Z: () => /* reexport */ API /* setMessages */.Z,
        jg: () => /* reexport */ API /* setPluginMessages */.jg,
        cr: () => /* reexport */ API /* setPluginServices */.cr,
        Bo: () => /* reexport */ API /* setService */.Bo,
      });

      // EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.0.0-rc.2/node_modules/react/jsx-runtime.js
      var jsx_runtime = __webpack_require__(82798);
      // EXTERNAL MODULE: ../../node_modules/.pnpm/react@18.0.0-rc.2/node_modules/react/index.js
      var react = __webpack_require__(63423); // CONCATENATED MODULE: ../dashboard/src/Dashboard.tsx
      const Dashboard = /*#__PURE__*/ (0, react.lazy)(() =>
        Promise.all(
          /* import() */ [
            __webpack_require__.e(5638),
            __webpack_require__.e(7871),
            __webpack_require__.e(8136),
            __webpack_require__.e(3617),
            __webpack_require__.e(4162),
            __webpack_require__.e(2474),
          ]
        ).then(__webpack_require__.bind(__webpack_require__, 12474))
      );
      function IntegratedDashboard() {
        return /*#__PURE__*/ (0, jsx_runtime.jsx)(react.Suspense, {
          fallback: "",
          children: /*#__PURE__*/ (0, jsx_runtime.jsx)(Dashboard, {}),
        });
      }

      // EXTERNAL MODULE: ../dashboard/src/API.tsx
      var API = __webpack_require__(85971);
      // EXTERNAL MODULE: ../dashboard/src/locales/en-US.json
      var en_US = __webpack_require__(62012);
      // EXTERNAL MODULE: ../dashboard/src/locales/ja-JP.json
      var ja_JP = __webpack_require__(97979);
      // EXTERNAL MODULE: ../dashboard/src/locales/ko-KR.json
      var ko_KR = __webpack_require__(75743);
      // EXTERNAL MODULE: ../dashboard/src/locales/qya-AA.json
      var qya_AA = __webpack_require__(59641);
      // EXTERNAL MODULE: ../dashboard/src/locales/zh-CN.json
      var zh_CN = __webpack_require__(32284);
      // EXTERNAL MODULE: ../dashboard/src/locales/zh-TW.json
      var zh_TW = __webpack_require__(39675);
      // EXTERNAL MODULE: ../shared-base/src/index.ts + 4 modules
      var src = __webpack_require__(79226); // CONCATENATED MODULE: ../dashboard/src/locales/languages.ts
      // This file is auto generated. DO NOT EDIT
      // Run `npx gulp sync-languages` to regenerate.
      // Default fallback language in a family of languages are chosen by the alphabet order
      // To overwrite this, please overwrite packages/scripts/src/locale-kit-next/index.ts

      const languages = {
        en: en_US,
        ja: ja_JP,
        ko: ko_KR,
        qy: qya_AA,
        "zh-CN": zh_CN,
        zh: zh_TW,
      };
      const addDashboardI18N = (0, src /* createI18NBundle */.C9)(
        "dashboard",
        languages
      );
      // @ts-ignore
      if (false) {
      } // CONCATENATED MODULE: ../dashboard/src/entry.tsx
      // This entry is for dashboard used as a package (required by the main extension).
      // Should only expose necessary API for setup the Dashboard API correctly.

      /***/
    },

    /***/ 17913: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ S_: () => /* binding */ isAndroidApp,
        /* harmony export */ vU: () => /* binding */ Flags,
        /* harmony export */
      });
      /* unused harmony export is_iOSApp */
      var ref, ref1;
      const is_iOSApp = true && "app" === "app";
      const isAndroidApp = true && "safari" === "firefox";
      const appOnly = "app" === "app";
      const devOnly = "production" === "development";
      const webOnly = false || devOnly;
      const insiderOnly = false || devOnly;
      const betaOrInsiderOnly = insiderOnly || "stable" === "beta";
      // TODO: In future, we can turn this object into a Proxy to receive flags from remote
      const Flags = {
        __raw__: {
          target: "safari",
          architecture: "app",
        },
        isolated_dashboard_bridge_enabled: false,
        mask_SDK_ready: betaOrInsiderOnly,
        /** There is no "tabs" to navigate to. We must be careful with this. */ has_no_browser_tab_ui:
          appOnly,
        has_no_connected_user_link: appOnly,
        has_native_nav_bar: appOnly,
        using_ShadowDOM_attach_mode: "closed",
        /** Don't inject injected script in this mode. Native side will do the job. */ support_declarative_user_script:
          is_iOSApp,
        /** Don't show welcome page in this mode. Native side will do the job. */ has_native_welcome_ui:
          appOnly,
        /** Firefox has a special API that can inject to the document with a higher permission. */ has_firefox_xray_vision:
          "safari" === "firefox",
        support_testnet_switch: betaOrInsiderOnly,
        // #region Experimental features
        image_payload_marked_as_beta: appOnly,
        transak_enabled: webOnly,
        trader_zrx_enabled: webOnly,
        trader_all_api_cached_enabled: devOnly,
        metamask_enabled: webOnly,
        injected_web3_enabled: webOnly,
        toolbox_enabled: webOnly,
        /** Prohibit the use of test networks in production */ wallet_allow_testnet:
          betaOrInsiderOnly || "production" !== "production",
        wallet_mnemonic_words_backup_enabled: false,
        wallet_private_key_backup_enabled: true,
        wallet_gas_price_dialog_enable: true,
        /* construct LBP for all ERC20 tokens */ LBP_enabled: false,
        LBP_whitelist_enabled: "production" === "production",
        plugin_switch_enabled: betaOrInsiderOnly,
        // #endregion
        EIP1559_enabled: true,
        bsc_enabled: true,
        polygon_enabled: true,
        arbitrum_enabled: true,
        xdai_enabled: true,
        avalanche_enabled: true,
        fantom_enabled: true,
        flow_enabled: true,
        celo_enabled: true,
        aurora_enabled: true,
        nft_airdrop_enabled: false,
        post_actions_enabled: false,
        next_id_tip_enabled: false,
        // #region Functionality missing / broken
        /**
         * - iOS: WebExtension polyfill didn't implemented the dynamic permission API
         */ no_web_extension_dynamic_permission_request: is_iOSApp,
        has_no_WebRTC: true || 0,
        // #endregion
        using_emoji_flag: true,
      };
      if (false) {
      }

      /***/
    },

    /***/ 70609: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ S_: () =>
          /* reexport safe */ _flags__WEBPACK_IMPORTED_MODULE_1__.S_,
        /* harmony export */ _H: () =>
          /* reexport safe */ _kv_storage__WEBPACK_IMPORTED_MODULE_2__._H,
        /* harmony export */ dH: () =>
          /* reexport safe */ _helpers_download__WEBPACK_IMPORTED_MODULE_3__.d,
        /* harmony export */ ql: () =>
          /* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_0__.q,
        /* harmony export */ rs: () =>
          /* reexport safe */ _helpers_download__WEBPACK_IMPORTED_MODULE_3__.r,
        /* harmony export */ uU: () =>
          /* reexport safe */ _kv_storage__WEBPACK_IMPORTED_MODULE_2__.uU,
        /* harmony export */ vU: () =>
          /* reexport safe */ _flags__WEBPACK_IMPORTED_MODULE_1__.vU,
        /* harmony export */
      });
      /* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(12814);
      /* harmony import */ var _flags__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(17913);
      /* harmony import */ var _kv_storage__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(55577);
      /* harmony import */ var _helpers_download__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(17703);

      /***/
    },

    /***/ 55577: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ $e: () => /* binding */ setupMaskKVStorageBackend,
        /* harmony export */ _H: () => /* binding */ PersistentStorages,
        /* harmony export */ uU: () => /* binding */ InMemoryStorages,
        /* harmony export */
      });
      /* harmony import */ var _masknet_shared_base__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(79226);
      /* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(12814);

      const indexedDBProxy = (0,
      _masknet_shared_base__WEBPACK_IMPORTED_MODULE_0__ /* .createProxyKVStorageBackend */.X2)();
      const inMemoryBackend = (0,
      _masknet_shared_base__WEBPACK_IMPORTED_MODULE_0__ /* .createProxyKVStorageBackend */.X2)();
      function setupMaskKVStorageBackend(indexedDB, inMemory) {
        indexedDBProxy.replaceBackend(indexedDB);
        inMemoryBackend.replaceBackend(inMemory);
      }
      const createPersistentKVStorage = (0,
      _masknet_shared_base__WEBPACK_IMPORTED_MODULE_0__ /* .createKVStorageHost */.rc)(
        indexedDBProxy,
        _messages__WEBPACK_IMPORTED_MODULE_1__ /* .MaskMessages.events.__kv_backend_persistent__ */
          .q.events.__kv_backend_persistent__
      );
      const createInMemoryKVStorage = (0,
      _masknet_shared_base__WEBPACK_IMPORTED_MODULE_0__ /* .createKVStorageHost */.rc)(
        inMemoryBackend,
        _messages__WEBPACK_IMPORTED_MODULE_1__ /* .MaskMessages.events.__kv_backend_in_memory__ */
          .q.events.__kv_backend_in_memory__
      );
      const InMemoryStorages = {
        Plugin: createInMemoryKVStorage("plugin", {}),
        FacebookNFTEventOnMobile: createInMemoryKVStorage(
          "FacebookNFTEventOnMobile",
          {
            userId: "",
            avatarId: "",
            address: "",
            tokenId: "",
          }
        ),
      };
      const PersistentStorages = {
        Plugin: createPersistentKVStorage("plugin", {}),
      };

      /***/
    },

    /***/ 85159: /***/ (
      __unused_webpack_module,
      __unused_webpack___webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(82798);
      /* harmony import */ var _masknet_dashboard__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(23730);
      /* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(45925);
      /* harmony import */ var _plugins_Wallet_messages__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(63081);
      /* harmony import */ var _plugins_Transak_messages__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(18509);
      /* harmony import */ var _plugins_Trader_messages__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(61274);
      /* harmony import */ var _plugins_Pets_messages__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(34740);
      /* harmony import */ var _utils_messages__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(2214);
      /* harmony import */ var _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_8__ =
        __webpack_require__(63151);
      /* harmony import */ var _plugin_infra_host__WEBPACK_IMPORTED_MODULE_9__ =
        __webpack_require__(73336);
      /* harmony import */ var _utils_createNormalReactRoot__WEBPACK_IMPORTED_MODULE_10__ =
        __webpack_require__(72234);
      /* harmony import */ var _shared_kv_storage__WEBPACK_IMPORTED_MODULE_11__ =
        __webpack_require__(55577);
      /* harmony import */ var _setup_ui__WEBPACK_IMPORTED_MODULE_12__ =
        __webpack_require__(37084);

      // @ts-ignore in case circle dependency make typescript complains

      const msg = {
        Wallet:
          _plugins_Wallet_messages__WEBPACK_IMPORTED_MODULE_3__ /* .WalletMessages */.R,
        Swap: _plugins_Trader_messages__WEBPACK_IMPORTED_MODULE_5__ /* .PluginTraderMessages */.A,
        Transak:
          _plugins_Transak_messages__WEBPACK_IMPORTED_MODULE_4__ /* .PluginTransakMessages */.l,
        Pets: _plugins_Pets_messages__WEBPACK_IMPORTED_MODULE_6__ /* .PluginPetMessages */.s,
      };
      const rpc = {
        Wallet:
          _plugins_Wallet_messages__WEBPACK_IMPORTED_MODULE_3__ /* .WalletRPC */.V,
        Swap: _plugins_Trader_messages__WEBPACK_IMPORTED_MODULE_5__ /* .PluginTraderRPC */.V,
      };
      // @ts-ignore To avoid build failure due to the circular project reference
      (0, _masknet_dashboard__WEBPACK_IMPORTED_MODULE_1__ /* .setService */.Bo)(
        _service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.ZP
      );
      // @ts-ignore
      (0, _masknet_dashboard__WEBPACK_IMPORTED_MODULE_1__ /* .setMessages */.Z)(
        _utils_messages__WEBPACK_IMPORTED_MODULE_7__ /* .MaskMessages */.q
      );
      // @ts-ignore
      (0,
      _masknet_dashboard__WEBPACK_IMPORTED_MODULE_1__ /* .setPluginServices */.cr)(
        rpc
      );
      // @ts-ignore
      (0,
      _masknet_dashboard__WEBPACK_IMPORTED_MODULE_1__ /* .setPluginMessages */.jg)(
        msg
      );
      (0,
      _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_8__ /* .startPluginDashboard */.CB)(
        (0,
        _plugin_infra_host__WEBPACK_IMPORTED_MODULE_9__ /* .createPluginHost */.R)(
          undefined,
          (pluginID, signal) => {
            return {
              createKVStorage(type, defaultValues) {
                if (type === "memory")
                  return _shared_kv_storage__WEBPACK_IMPORTED_MODULE_11__ /* .InMemoryStorages.Plugin.createSubScope */.uU.Plugin.createSubScope(
                    pluginID,
                    defaultValues,
                    signal
                  );
                else
                  return _shared_kv_storage__WEBPACK_IMPORTED_MODULE_11__ /* .PersistentStorages.Plugin.createSubScope */._H.Plugin.createSubScope(
                    pluginID,
                    defaultValues,
                    signal
                  );
              },
              personaSign:
                _service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"].Identity.signWithPersona */
                  .ZP.Identity.signWithPersona,
              walletSign:
                _service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"].Ethereum.personalSign */
                  .ZP.Ethereum.personalSign,
            };
          }
        )
      );
      _setup_ui__WEBPACK_IMPORTED_MODULE_12__ /* .status.then */.i
        .then(() =>
          (0,
          _utils_createNormalReactRoot__WEBPACK_IMPORTED_MODULE_10__ /* .createNormalReactRoot */.j)(
            /*#__PURE__*/ (0,
            react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
              _masknet_dashboard__WEBPACK_IMPORTED_MODULE_1__ /* .IntegratedDashboard */.QG,
              {}
            )
          )
        );

      /***/
    },

    /***/ 45925: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Ql: () => /* binding */ ServicesWithProgress,
        /* harmony export */ ZP: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* unused harmony export Services */
      /* harmony import */ var async_call_rpc_full__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(19245);
      /* harmony import */ var _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(44162);
      /* harmony import */ var _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2___default =
        /*#__PURE__*/ __webpack_require__.n(
          _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2__
        );
      /* harmony import */ var _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(79226);
      // Notice, this module itself is not HMR ready.
      // If you change this file to add a new service, you need to reload.
      // This file should not rely on any other in-project files unless it is HMR ready.

      const SERVICE_HMR_EVENT = "service-hmr";
      const message =
        new _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2__.WebExtensionMessage(
          {
            domain: "services",
          }
        );
      const log = {
        beCalled: true,
        localError: true,
        remoteError: true,
        sendLocalStack: true,
        type: "pretty",
        requestReplay: "production" === "development",
      };
      const Services = {
        Crypto: add(
          () =>
            Promise.all(
              /* import() */ [
                __webpack_require__.e(2943),
                __webpack_require__.e(6768),
                __webpack_require__.e(993),
              ]
            ).then(__webpack_require__.bind(__webpack_require__, 50993)),
          "Crypto"
        ),
        Identity: add(
          () =>
            Promise.all(
              /* import() */ [
                __webpack_require__.e(2698),
                __webpack_require__.e(3294),
                __webpack_require__.e(4227),
                __webpack_require__.e(4544),
                __webpack_require__.e(5737),
                __webpack_require__.e(3883),
                __webpack_require__.e(2299),
                __webpack_require__.e(6045),
                __webpack_require__.e(1077),
                __webpack_require__.e(8117),
                __webpack_require__.e(2943),
                __webpack_require__.e(5756),
                __webpack_require__.e(8492),
                __webpack_require__.e(7765),
                __webpack_require__.e(1305),
                __webpack_require__.e(5891),
                __webpack_require__.e(8936),
                __webpack_require__.e(6265),
                __webpack_require__.e(1246),
                __webpack_require__.e(7141),
                __webpack_require__.e(708),
                __webpack_require__.e(9447),
                __webpack_require__.e(1922),
                __webpack_require__.e(4859),
                __webpack_require__.e(876),
                __webpack_require__.e(597),
                __webpack_require__.e(9318),
              ]
            ).then(__webpack_require__.bind(__webpack_require__, 55601)),
          "Identity"
        ),
        Welcome: add(
          () =>
            Promise.all(
              /* import() */ [
                __webpack_require__.e(2698),
                __webpack_require__.e(3294),
                __webpack_require__.e(4227),
                __webpack_require__.e(4544),
                __webpack_require__.e(5737),
                __webpack_require__.e(3883),
                __webpack_require__.e(2299),
                __webpack_require__.e(6045),
                __webpack_require__.e(1077),
                __webpack_require__.e(8117),
                __webpack_require__.e(2943),
                __webpack_require__.e(5756),
                __webpack_require__.e(8492),
                __webpack_require__.e(7765),
                __webpack_require__.e(1305),
                __webpack_require__.e(5891),
                __webpack_require__.e(8936),
                __webpack_require__.e(6265),
                __webpack_require__.e(1246),
                __webpack_require__.e(7141),
                __webpack_require__.e(708),
                __webpack_require__.e(9447),
                __webpack_require__.e(1922),
                __webpack_require__.e(4859),
                __webpack_require__.e(876),
                __webpack_require__.e(597),
                __webpack_require__.e(9318),
              ]
            ).then(__webpack_require__.bind(__webpack_require__, 19470)),
          "Welcome"
        ),
        Helper: add(
          () =>
            __webpack_require__
              .e(/* import() */ 841)
              .then(__webpack_require__.bind(__webpack_require__, 90841)),
          "Helper"
        ),
        Ethereum: add(
          () =>
            Promise.all(
              /* import() */ [
                __webpack_require__.e(2698),
                __webpack_require__.e(4227),
                __webpack_require__.e(4544),
                __webpack_require__.e(5737),
                __webpack_require__.e(3883),
                __webpack_require__.e(2299),
                __webpack_require__.e(6045),
                __webpack_require__.e(1077),
                __webpack_require__.e(8117),
                __webpack_require__.e(2943),
                __webpack_require__.e(5756),
                __webpack_require__.e(8492),
                __webpack_require__.e(7765),
                __webpack_require__.e(1305),
                __webpack_require__.e(5891),
                __webpack_require__.e(8936),
                __webpack_require__.e(6265),
                __webpack_require__.e(1246),
                __webpack_require__.e(7141),
                __webpack_require__.e(708),
                __webpack_require__.e(9447),
                __webpack_require__.e(1922),
                __webpack_require__.e(4859),
                __webpack_require__.e(876),
                __webpack_require__.e(3291),
              ]
            ).then(__webpack_require__.bind(__webpack_require__, 9338)),
          "Ethereum"
        ),
        SocialNetwork: add(
          () =>
            __webpack_require__
              .e(/* import() */ 2516)
              .then(__webpack_require__.bind(__webpack_require__, 62516)),
          "SocialNetwork"
        ),
        Settings: add(
          () =>
            Promise.all(
              /* import() */ [
                __webpack_require__.e(2698),
                __webpack_require__.e(3294),
                __webpack_require__.e(4227),
                __webpack_require__.e(4544),
                __webpack_require__.e(5737),
                __webpack_require__.e(3883),
                __webpack_require__.e(2299),
                __webpack_require__.e(6045),
                __webpack_require__.e(1077),
                __webpack_require__.e(8117),
                __webpack_require__.e(2943),
                __webpack_require__.e(5756),
                __webpack_require__.e(8492),
                __webpack_require__.e(7765),
                __webpack_require__.e(1305),
                __webpack_require__.e(5891),
                __webpack_require__.e(8936),
                __webpack_require__.e(6265),
                __webpack_require__.e(1246),
                __webpack_require__.e(7141),
                __webpack_require__.e(708),
                __webpack_require__.e(9447),
                __webpack_require__.e(1922),
                __webpack_require__.e(4859),
                __webpack_require__.e(876),
                __webpack_require__.e(597),
                __webpack_require__.e(9318),
              ]
            ).then(__webpack_require__.bind(__webpack_require__, 27689)),
          "Settings"
        ),
        ThirdPartyPlugin: add(
          () =>
            __webpack_require__
              .e(/* import() */ 1400)
              .then(__webpack_require__.bind(__webpack_require__, 61400)),
          "ThirdPartyPlugin"
        ),
      };
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = Services;
      const ServicesWithProgress = add(
        () =>
          Promise.all(
            /* import() */ [
              __webpack_require__.e(6768),
              __webpack_require__.e(3222),
            ]
          ).then(__webpack_require__.bind(__webpack_require__, 63222)),
        "ServicesWithProgress",
        true
      );
      if (false) {
      }
      /**
       * Helper to add a new service to Services.* / ServicesWithProgress.* namespace.
       * @param impl Implementation of the service. Should be things like () => import("./background-script/CryptoService")
       * @param key Name of the service. Used for better debugging.
       * @param generator Is the service is a generator?
       */ function add(impl, key, generator = false) {
        const channel = message.events[key].bind(
          _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2__.MessageTarget
            .Broadcast
        );
        const isBackground = (0,
        _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2__.isEnvironment)(
          _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_2__.Environment
            .ManifestBackground
        );
        const RPC = generator
          ? async_call_rpc_full__WEBPACK_IMPORTED_MODULE_0__ /* .AsyncGeneratorCall */.rc
          : async_call_rpc_full__WEBPACK_IMPORTED_MODULE_0__ /* .AsyncCall */.LE;
        const load = () =>
          (0,
          _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ /* .getLocalImplementation */.Bb)(
            isBackground,
            `Services.${key}`,
            impl,
            channel
          );
        const localImplementation = load();
        // No HMR support in MV3
        true &&
          isBackground &&
          /* unsupported import.meta.webpackHot */ undefined &&
          0;
        const service = RPC(localImplementation, {
          key,
          serializer:
            _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ /* .serializer */.GM,
          log,
          channel,
          preferLocalImplementation: isBackground,
          strict: isBackground,
          thenable: false,
        });
        if (isBackground) {
          localImplementation.then((val) => {
            Reflect.set(globalThis, key + "Service", val);
            if (isBackground) Reflect.set(Services, key, val);
          });
        } else {
          Reflect.set(globalThis, key + "Service", service);
          if (isBackground) Reflect.set(Services, key, service);
        }
        return service;
      }

      /***/
    },

    /***/ 34740: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ k: () => /* binding */ PluginPetRPC,
        /* harmony export */ s: () => /* binding */ PluginPetMessages,
        /* harmony export */
      });
      /* harmony import */ var _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(63151);
      /* harmony import */ var _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(79226);
      /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(72214);

      if (false) {
      }
      const PluginPetMessages = {
        events: (0,
        _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ /* .createPluginMessage */.I4)(
          _constants__WEBPACK_IMPORTED_MODULE_2__ /* .PetsPluginID */.Dt,
          _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ /* .serializer */.GM
        ),
      };
      const PluginPetRPC = (0,
      _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ /* .createPluginRPC */.V8)(
        _constants__WEBPACK_IMPORTED_MODULE_2__ /* .PetsPluginID */.Dt,
        () =>
          Promise.all(
            /* import() */ [
              __webpack_require__.e(2698),
              __webpack_require__.e(4227),
              __webpack_require__.e(4544),
              __webpack_require__.e(5737),
              __webpack_require__.e(3883),
              __webpack_require__.e(2299),
              __webpack_require__.e(6045),
              __webpack_require__.e(1077),
              __webpack_require__.e(8117),
              __webpack_require__.e(2943),
              __webpack_require__.e(5756),
              __webpack_require__.e(8492),
              __webpack_require__.e(7765),
              __webpack_require__.e(1305),
              __webpack_require__.e(5891),
              __webpack_require__.e(8936),
              __webpack_require__.e(6265),
              __webpack_require__.e(1246),
              __webpack_require__.e(7141),
              __webpack_require__.e(708),
              __webpack_require__.e(9447),
              __webpack_require__.e(1922),
              __webpack_require__.e(4859),
              __webpack_require__.e(876),
              __webpack_require__.e(8138),
            ]
          ).then(__webpack_require__.bind(__webpack_require__, 24895)),
        PluginPetMessages.events.rpc
      );

      /***/
    },

    /***/ 83605: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Bq: () => /* binding */ SLIPPAGE_MIN,
        /* harmony export */ IS: () => /* binding */ ONE_BIPS,
        /* harmony export */ Nd: () => /* binding */ SLIPPAGE_DEFAULT,
        /* harmony export */ PM: () => /* binding */ BIPS_BASE,
        /* harmony export */ Q9: () => /* binding */ SLIPPAGE_MAX,
        /* harmony export */ ag: () =>
          /* binding */ DEFAULT_TRANSACTION_DEADLINE,
        /* harmony export */ rI: () => /* binding */ MINIMUM_AMOUNT,
        /* harmony export */ rV: () => /* binding */ L2_TRANSACTION_DEADLINE,
        /* harmony export */
      });
      /* unused harmony exports PRICE_IMPACT_LOW, PRICE_IMPACT_MEDIUM, PRICE_IMPACT_HIGH, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN, PRICE_IMPACT_NON_EXPERT_BLOCKED */
      /* harmony import */ var _masknet_web3_shared_base__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(26618);
      /* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(42263);
      /* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_1___default =
        /*#__PURE__*/ __webpack_require__.n(
          bignumber_js__WEBPACK_IMPORTED_MODULE_1__
        );

      const BIPS_BASE =
        new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())(10000);
      const ONE_BIPS =
        _masknet_web3_shared_base__WEBPACK_IMPORTED_MODULE_0__ /* .ONE.dividedBy */.ry
          .dividedBy(BIPS_BASE);
      const SLIPPAGE_MIN = 10; // bips
      const SLIPPAGE_DEFAULT = 50; // bips
      const SLIPPAGE_MAX = 2000; // bips
      const DEFAULT_TRANSACTION_DEADLINE = 30 /* minutes */ * 60; /* seconds */
      const L2_TRANSACTION_DEADLINE = 60 /* minutes */ * 5; /* seconds */
      const PRICE_IMPACT_LOW = 100; // 1%
      const PRICE_IMPACT_MEDIUM = 300; // 3%
      const PRICE_IMPACT_HIGH = 500; // 5%
      // if the price slippage exceeds this number, force the user to type 'confirm' to execute
      const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = 1000; // 10%
      // for non expert mode disable swaps above this
      const PRICE_IMPACT_NON_EXPERT_BLOCKED = 1500; // 15%
      const MINIMUM_AMOUNT =
        new (bignumber_js__WEBPACK_IMPORTED_MODULE_1___default())("1e-6");

      /***/
    },

    /***/ 61274: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ A: () => /* binding */ PluginTraderMessages,
        /* harmony export */ V: () => /* binding */ PluginTraderRPC,
        /* harmony export */
      });
      /* harmony import */ var _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(63151);
      /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(43545);

      if (false) {
      }
      const PluginTraderMessages = (0,
      _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ /* .createPluginMessage */.I4)(
        _constants__WEBPACK_IMPORTED_MODULE_1__ /* .PLUGIN_ID */.Uu
      );
      const PluginTraderRPC = (0,
      _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ /* .createPluginRPC */.V8)(
        _constants__WEBPACK_IMPORTED_MODULE_1__ /* .PLUGIN_ID */.Uu,
        () =>
          Promise.all(
            /* import() */ [
              __webpack_require__.e(2698),
              __webpack_require__.e(3294),
              __webpack_require__.e(187),
              __webpack_require__.e(3758),
              __webpack_require__.e(211),
              __webpack_require__.e(7604),
              __webpack_require__.e(3375),
              __webpack_require__.e(1626),
              __webpack_require__.e(4581),
            ]
          ).then(__webpack_require__.bind(__webpack_require__, 90850)),
        PluginTraderMessages.rpc
      );

      /***/
    },

    /***/ 18509: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ l: () => /* binding */ PluginTransakMessages,
        /* harmony export */
      });
      /* harmony import */ var _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(63151);
      /* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(83908);

      if (false) {
      }
      const PluginTransakMessages = (0,
      _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ /* .createPluginMessage */.I4)(
        _constants__WEBPACK_IMPORTED_MODULE_1__ /* .PLUGIN_ID */.Uu
      );

      /***/
    },

    /***/ 21202: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ AI: () => /* binding */ currentSetupGuideStatus,
        /* harmony export */ Ct: () => /* binding */ userGuideStatus,
        /* harmony export */ JE: () => /* binding */ bioDescription,
        /* harmony export */ OF: () => /* binding */ appearanceSettings,
        /* harmony export */ Pg: () => /* binding */ sayHelloShowed,
        /* harmony export */ VO: () =>
          /* binding */ currentPluginMinimalModeNOTEnabled,
        /* harmony export */ cn: () => /* binding */ currentPersonaIdentifier,
        /* harmony export */ g4: () => /* binding */ dismissPinExtensionTip,
        /* harmony export */ gG: () => /* binding */ dismissVerifyNextID,
        /* harmony export */ i4: () => /* binding */ launchPageSettings,
        /* harmony export */ pQ: () => /* binding */ languageSettings,
        /* harmony export */ tR: () => /* binding */ pluginIDSettings,
        /* harmony export */ vv: () => /* binding */ debugModeSetting,
        /* harmony export */ yO: () => /* binding */ personalHomepage,
        /* harmony export */
      });
      /* unused harmony exports currentImagePayloadStatus, currentSelectedIdentity, getCurrentSelectedIdentity, newDashboardConnection */
      /* harmony import */ var _createSettings__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(91296);
      /* harmony import */ var _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(28331);
      /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(13758);
      /* harmony import */ var _masknet_theme__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(43021);
      /* harmony import */ var _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(48476);
      /* harmony import */ var _masknet_shared_base__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(79226);
      /* harmony import */ var _plugins_EVM_constants__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(89664);
      /* harmony import */ var lodash_unified__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(23587);

      /**
       * Does the debug mode on
       */ const debugModeSetting = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "debugMode",
        false,
        {
          primary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_enable_debug"),
          secondary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_enable_debug_desc"),
        }
      );
      // #region appearance
      const appearanceSettings = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "appearance",
        _masknet_theme__WEBPACK_IMPORTED_MODULE_3__ /* .Appearance["default"] */
          .um["default"],
        {
          primary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_appearance"),
          secondary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_appearance_secondary"),
        }
      );
      // #endregion
      // #region language
      const languageSettings = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "language",
        _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ /* .LanguageOptions.__auto__ */
          .P7.__auto__,
        {
          primary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_language"),
          secondary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_language_secondary"),
        }
      );
      // #endregion
      // #region web3 plugin ID
      const pluginIDSettings = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "pluginID",
        _plugins_EVM_constants__WEBPACK_IMPORTED_MODULE_6__ /* .PLUGIN_ID */.Uu,
        {
          primary: () => "DO NOT DISPLAY IT IN UI",
        }
      );
      // #endregion
      // #region network setting
      /**
       * Expected Usage: export const currentImagePayloadStatus = createNetworkSettings('currentImagePayloadStatus')
       *
       * Work around the issue:
       *      https://github.com/microsoft/TypeScript/issues/42873
       *      https://github.com/microsoft/TypeScript/issues/30858
       *
       * References:
       *      PluginGitcoinMessages: packages/mask/src/plugins/Gitcoin/messages.ts
       *      PluginTraderMessages: packages/mask/src/plugins/Trader/messages.ts
       *      PluginTransakMessages: packages/mask/src/plugins/Transak/messages.ts
       */ const currentImagePayloadStatus = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "currentImagePayloadStatus",
        ""
      );
      const currentSelectedIdentity = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "currentSelectedIdentity",
        ""
      );
      function getCurrentSelectedIdentity(network) {
        return Identifier.fromString(
          currentSelectedIdentity[network].value,
          ProfileIdentifier
        ).unwrapOr(ProfileIdentifier.unknown);
      }
      const currentSetupGuideStatus = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "currentSetupGuideStatus",
        ""
      );
      const userGuideStatus = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "userGuideStatus",
        ""
      );
      const sayHelloShowed = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "sayHelloShowed",
        false
      );
      const dismissPinExtensionTip = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "dismissPinExtensionTip",
        false,
        {
          primary: () => "",
        }
      );
      const dismissVerifyNextID = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "dismissVerifyNextID",
        {},
        lodash_unified__WEBPACK_IMPORTED_MODULE_7__ /* ["default"] */.Z
      );
      const bioDescription = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "bioDescription",
        ""
      );
      const personalHomepage = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "personalHomepage",
        ""
      );
      // This is a misuse of concept "NetworkSettings" as "namespaced settings"
      // The refactor is tracked in https://github.com/DimensionDev/Maskbook/issues/1884
      /**
       * ! DO NOT use this directly to query the plugin status !
       *
       * use `useActivatedPluginsSNSAdaptor().find((x) => x.ID === PLUGIN_ID)` or
       * `useActivatedPluginsDashboard().find((x) => x.ID === PLUGIN_ID)` instead
       */ // This was "currentPluginEnabled" before, but we used it to represent minimal mode now to make the settings be able to migrate.
      const currentPluginMinimalModeNOTEnabled = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createNetworkSettings */.Lk)(
        "pluginsEnabled",
        true
      );
      // #endregion
      const launchPageSettings = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "launchPage",
        _types__WEBPACK_IMPORTED_MODULE_2__ /* .LaunchPage.dashboard */.z
          .dashboard,
        {
          primary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_launch_page"),
          secondary: () =>
            _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_1__ /* .i18n.t */.a
              .t("settings_launch_page_secondary"),
        }
      );
      const newDashboardConnection = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "beta-dashboard",
        false,
        {
          primary: () => "Experimental: Allow isolated dashboard to connect",
          secondary: () =>
            "WARNING: DON'T OPEN THIS UNLESS YOU KNOW WHAT YOU ARE DOING.",
        }
      );
      const currentPersonaIdentifier = (0,
      _createSettings__WEBPACK_IMPORTED_MODULE_0__ /* .createGlobalSettings */.TI)(
        "currentPersonaIdentifier",
        "",
        {
          primary: () => "DO NOT DISPLAY IT IN UI",
        }
      );
      try {
        // Migrate language settings
        const lng = languageSettings.value;
        if (lng === "en")
          languageSettings.value =
            _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ /* .LanguageOptions.enUS */.P7.enUS;
        else if (lng === "zh")
          languageSettings.value =
            _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ /* .LanguageOptions.zhCN */.P7.zhCN;
        else if (lng === "ja")
          languageSettings.value =
            _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ /* .LanguageOptions.jaJP */.P7.jaJP;
        else if (lng === "ko")
          languageSettings.value =
            _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ /* .LanguageOptions.koKR */.P7.koKR;
        else
          languageSettings.value =
            _masknet_public_api__WEBPACK_IMPORTED_MODULE_4__ /* .LanguageOptions.__auto__ */.P7.__auto__;
      } catch {}

      /***/
    },

    /***/ 3787: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ activateSocialNetworkUIInner: () =>
          /* binding */ activateSocialNetworkUIInner,
        /* harmony export */ activatedSocialNetworkUI: () =>
          /* binding */ activatedSocialNetworkUI,
        /* harmony export */ globalUIState: () => /* binding */ globalUIState,
        /* harmony export */ loadSocialNetworkUI: () =>
          /* binding */ loadSocialNetworkUI,
        /* harmony export */ loadSocialNetworkUISync: () =>
          /* binding */ loadSocialNetworkUISync,
        /* harmony export */
      });
      /* harmony import */ var _utils_debug_general__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(24121);
      /* harmony import */ var _utils_debug_ui__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(73624);
      /* harmony import */ var _extension_service__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(45925);
      /* harmony import */ var _shared__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(70609);
      /* harmony import */ var _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(28331);
      /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(32665);
      /* harmony import */ var _settings_settings__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(21202);
      /* harmony import */ var _masknet_shared_base__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(79226);
      /* harmony import */ var _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_15__ =
        __webpack_require__(44162);
      /* harmony import */ var _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_15___default =
        /*#__PURE__*/ __webpack_require__.n(
          _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_15__
        );
      /* harmony import */ var _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_8__ =
        __webpack_require__(63151);
      /* harmony import */ var _social_network_adaptor_utils__WEBPACK_IMPORTED_MODULE_9__ =
        __webpack_require__(23003);
      /* harmony import */ var _plugin_infra_host__WEBPACK_IMPORTED_MODULE_10__ =
        __webpack_require__(73336);
      /* harmony import */ var _define__WEBPACK_IMPORTED_MODULE_11__ =
        __webpack_require__(86911);
      /* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_12__ =
        __webpack_require__(93573);
      /* harmony import */ var _dimensiondev_kit__WEBPACK_IMPORTED_MODULE_13__ =
        __webpack_require__(66559);
      /* harmony import */ var _masknet_encryption__WEBPACK_IMPORTED_MODULE_14__ =
        __webpack_require__(57614);

      const definedSocialNetworkUIsResolved = new Map();
      let activatedSocialNetworkUI = {
        automation: {},
        collecting: {},
        customization: {},
        configuration: {},
        permission: {
          has: async () => false,
          request: async () => false,
        },
        init: () => {
          throw new Error();
        },
        injection: {},
        encryptionNetwork:
          _masknet_encryption__WEBPACK_IMPORTED_MODULE_14__ /* .SocialNetworkEnum.Unknown */
            .Gq.Unknown,
        networkIdentifier:
          _masknet_shared_base__WEBPACK_IMPORTED_MODULE_7__ /* .EnhanceableSite.Localhost */
            .Jk.Localhost,
        shouldActivate: () => false,
        utils: {
          createPostContext: null,
        },
        notReadyForProduction: true,
        declarativePermissions: {
          origins: [],
        },
      };
      let globalUIState = {};
      async function activateSocialNetworkUIInner(ui_deferred) {
        var ref19,
          ref1,
          ref2,
          _injection15,
          ref3,
          _injection1,
          ref4,
          _injection2,
          ref5,
          ref6,
          ref7,
          _injection3,
          ref8,
          _injection4,
          ref9,
          _injection5,
          ref10,
          _injection6,
          ref11,
          _injection7,
          ref12,
          _injection8,
          ref13,
          _injection9,
          ref14,
          _injection10,
          ref15,
          _injection11,
          ref16,
          _injection12,
          ref17;
        (0,
        _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_15__.assertNotEnvironment)(
          _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_15__.Environment
            .ManifestBackground
        );
        console.log("Activating provider", ui_deferred.networkIdentifier);
        const ui = (activatedSocialNetworkUI = await loadSocialNetworkUI(
          ui_deferred.networkIdentifier
        ));
        console.log(
          "Provider activated. You can access it by globalThis.ui",
          ui
        );
        Object.assign(globalThis, {
          ui,
        });
        const abort1 = new AbortController();
        const { signal: signal1 } = abort1;
        await (0,
        _dimensiondev_kit__WEBPACK_IMPORTED_MODULE_13__ /* .waitDocumentReadyState */.uL)(
          "interactive"
        );
        i18nOverwrite();
        const state = await ui.init(signal1);
        globalUIState = {
          ...state,
          ...(0,
          _utils__WEBPACK_IMPORTED_MODULE_5__ /* .managedStateCreator */.MJ)(),
        };
        (ref19 = ui.customization.paletteMode) === null || ref19 === void 0
          ? void 0
          : ref19.start(signal1);
        startIntermediateSetupGuide();
        $unknownIdentityResolution();
        (ref1 = ui.collecting.postsProvider) === null || ref1 === void 0
          ? void 0
          : ref1.start(signal1);
        startPostListener();
        (ref2 = ui.collecting.currentVisitingIdentityProvider) === null ||
        ref2 === void 0
          ? void 0
          : ref2.start(signal1);
        (ref3 = (_injection15 = ui.injection).pageInspector) === null ||
        ref3 === void 0
          ? void 0
          : ref3.call(_injection15, signal1);
        if (
          _shared__WEBPACK_IMPORTED_MODULE_3__ /* .Flags.toolbox_enabled */.vU
            .toolbox_enabled
        )
          (ref4 = (_injection1 = ui.injection).toolbox) === null ||
          ref4 === void 0
            ? void 0
            : ref4.call(_injection1, signal1);
        (ref5 = (_injection2 = ui.injection).setupPrompt) === null ||
        ref5 === void 0
          ? void 0
          : ref5.call(_injection2, signal1);
        (ref6 = ui.injection.newPostComposition) === null || ref6 === void 0
          ? void 0
          : (ref7 = ref6.start) === null || ref7 === void 0
          ? void 0
          : ref7.call(ref6, signal1);
        (ref8 = (_injection3 = ui.injection).searchResult) === null ||
        ref8 === void 0
          ? void 0
          : ref8.call(_injection3, signal1);
        (ref9 = (_injection4 = ui.injection).userBadge) === null ||
        ref9 === void 0
          ? void 0
          : ref9.call(_injection4, signal1);
        (ref10 = (_injection5 = ui.injection).profileTab) === null ||
        ref10 === void 0
          ? void 0
          : ref10.call(_injection5, signal1);
        (ref11 = (_injection6 = ui.injection).profileTabContent) === null ||
        ref11 === void 0
          ? void 0
          : ref11.call(_injection6, signal1);
        (ref12 = (_injection7 = ui.injection).userAvatar) === null ||
        ref12 === void 0
          ? void 0
          : ref12.call(_injection7, signal1);
        (ref13 = (_injection8 = ui.injection).profileAvatar) === null ||
        ref13 === void 0
          ? void 0
          : ref13.call(_injection8, signal1);
        (ref14 = (_injection9 = ui.injection).enhancedProfileNFTAvatar) ===
          null || ref14 === void 0
          ? void 0
          : ref14.call(_injection9, signal1);
        (ref15 = (_injection10 = ui.injection).openNFTAvatar) === null ||
        ref15 === void 0
          ? void 0
          : ref15.call(_injection10, signal1);
        (ref16 = (_injection11 = ui.injection).postAndReplyNFTAvatar) ===
          null || ref16 === void 0
          ? void 0
          : ref16.call(_injection11, signal1);
        (ref17 = (_injection12 = ui.injection).avatarClipNFT) === null ||
        ref17 === void 0
          ? void 0
          : ref17.call(_injection12, signal1);
        (0,
        _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_8__ /* .startPluginSNSAdaptor */.D4)(
          (0,
          _social_network_adaptor_utils__WEBPACK_IMPORTED_MODULE_9__ /* .getCurrentSNSNetwork */.G)(
            ui.networkIdentifier
          ),
          (0,
          _plugin_infra_host__WEBPACK_IMPORTED_MODULE_10__ /* .createPluginHost */.R)(
            signal1,
            (pluginID, signal) => {
              return {
                createKVStorage(type, defaultValues) {
                  if (type === "memory")
                    return _shared__WEBPACK_IMPORTED_MODULE_3__ /* .InMemoryStorages.Plugin.createSubScope */.uU.Plugin.createSubScope(
                      pluginID,
                      defaultValues,
                      signal
                    );
                  else
                    return _shared__WEBPACK_IMPORTED_MODULE_3__ /* .PersistentStorages.Plugin.createSubScope */._H.Plugin.createSubScope(
                      pluginID,
                      defaultValues,
                      signal
                    );
                },
                personaSign:
                  _extension_service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"].Identity.signWithPersona */
                    .ZP.Identity.signWithPersona,
                walletSign:
                  _extension_service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"].Ethereum.personalSign */
                    .ZP.Ethereum.personalSign,
                currentPersona: (0,
                _masknet_shared_base__WEBPACK_IMPORTED_MODULE_7__ /* .createSubscriptionFromAsync */.Fd)(
                  _extension_service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"].Settings.getCurrentPersonaIdentifier */
                    .ZP.Settings.getCurrentPersonaIdentifier,
                  undefined,
                  _utils__WEBPACK_IMPORTED_MODULE_12__ /* .MaskMessages.events.currentPersonaIdentifier.on */
                    .ql.events.currentPersonaIdentifier.on
                ),
              };
            }
          )
        );
        (0,
        _utils__WEBPACK_IMPORTED_MODULE_12__ /* .setupShadowRootPortal */.Vc)();
        function i18nOverwrite() {
          const i18n = ui.customization.i18nOverwrite || {};
          for (const namespace in i18n) {
            const ns = i18n[namespace];
            for (const i18nKey in ns) {
              const pair = i18n[namespace][i18nKey];
              for (const language in pair) {
                const value = pair[language];
                _shared_ui_locales_legacy__WEBPACK_IMPORTED_MODULE_4__ /* ["default"].addResource */.Z.addResource(
                  language,
                  namespace,
                  i18nKey,
                  value
                );
              }
            }
          }
        }
        function $unknownIdentityResolution() {
          const provider = ui.collecting.identityProvider;
          if (!provider) return;
          provider.start(signal1);
          provider.recognized.addListener((newValue, oldValue) => {
            if (document.visibilityState === "hidden") return;
            if (newValue.identifier.equals(oldValue.identifier)) return;
            if (newValue.identifier.isUnknown) return;
            _utils__WEBPACK_IMPORTED_MODULE_12__ /* .MaskMessages.events.Native_visibleSNS_currentDetectedProfileUpdated.sendToBackgroundPage */.ql.events.Native_visibleSNS_currentDetectedProfileUpdated.sendToBackgroundPage(
              newValue.identifier.toText()
            );
          });
          if (provider.hasDeprecatedPlaceholderName) {
            provider.recognized.addListener((id) => {
              if (signal1.aborted) return;
              if (id.identifier.isUnknown) return;
              _extension_service__WEBPACK_IMPORTED_MODULE_2__ /* ["default"].Identity.resolveIdentity */.ZP.Identity.resolveIdentity(
                id.identifier
              );
            });
          }
        }
        function startPostListener() {
          var ref24;
          const posts =
            (ref24 = ui.collecting.postsProvider) === null || ref24 === void 0
              ? void 0
              : ref24.posts;
          if (!posts) return;
          const abortSignals = new WeakMap();
          posts.event.on("set", async (key, value) => {
            var _injection,
              ref,
              _injection13,
              ref20,
              _injection14,
              ref21,
              ref22,
              ref23;
            await unmount(key);
            const abort = new AbortController();
            signal1.addEventListener("abort", () => abort.abort());
            abortSignals.set(key, abort);
            const { signal: postSignal } = abort;
            (ref = (_injection = ui.injection).enhancedPostRenderer) === null ||
            ref === void 0
              ? void 0
              : ref.call(_injection, postSignal, value);
            (ref20 = (_injection13 = ui.injection).postInspector) === null ||
            ref20 === void 0
              ? void 0
              : ref20.call(_injection13, postSignal, value);
            (ref21 = (_injection14 = ui.injection).postActions) === null ||
            ref21 === void 0
              ? void 0
              : ref21.call(_injection14, postSignal, value);
            (ref22 = ui.injection.commentComposition) === null ||
            ref22 === void 0
              ? void 0
              : ref22.compositionBox(postSignal, value);
            (ref23 = ui.injection.commentComposition) === null ||
            ref23 === void 0
              ? void 0
              : ref23.commentInspector(postSignal, value);
          });
          posts.event.on("delete", unmount);
          function unmount(key) {
            if (!abortSignals.has(key)) return;
            abortSignals.get(key).abort();
            // AbortSignal need an event loop
            // unmount a React root need another one.
            // let's guess a number that the React root will unmount.
            return (0,
            _dimensiondev_kit__WEBPACK_IMPORTED_MODULE_13__ /* .delay */.gw)(
              16 * 3
            );
          }
        }
        function startIntermediateSetupGuide() {
          const network = ui.networkIdentifier;
          const id1 =
            _settings_settings__WEBPACK_IMPORTED_MODULE_6__ /* .currentSetupGuideStatus */
              .AI[network].value;
          let started = false;
          const onStatusUpdate = (id) => {
            const { persona, status } = JSON.parse(id || "{}");
            if (persona && status && !started) {
              var _injection, ref;
              started = true;
              (ref = (_injection = ui.injection).setupWizard) === null ||
              ref === void 0
                ? void 0
                : ref.call(
                    _injection,
                    signal1,
                    _masknet_shared_base__WEBPACK_IMPORTED_MODULE_7__ /* .Identifier.fromString */.xb
                      .fromString(
                        persona,
                        _masknet_shared_base__WEBPACK_IMPORTED_MODULE_7__ /* .ECKeyIdentifier */.ob
                      )
                      .unwrap()
                  );
            }
          };
          _settings_settings__WEBPACK_IMPORTED_MODULE_6__ /* .currentSetupGuideStatus */.AI[
            network
          ]
            .addListener(onStatusUpdate);
          _settings_settings__WEBPACK_IMPORTED_MODULE_6__ /* .currentSetupGuideStatus */.AI[
            network
          ].readyPromise
            .then(onStatusUpdate);
          onStatusUpdate(id1);
        }
      }
      async function loadSocialNetworkUI(identifier) {
        if (definedSocialNetworkUIsResolved.has(identifier))
          return definedSocialNetworkUIsResolved.get(identifier);
        const define =
          _define__WEBPACK_IMPORTED_MODULE_11__ /* .definedSocialNetworkUIs.get */.LB.get(
            identifier
          );
        if (!define) throw new Error("SNS adaptor not found");
        const ui1 = (await define.load()).default;
        definedSocialNetworkUIsResolved.set(identifier, ui1);
        return ui1;
      }
      function loadSocialNetworkUISync(identifier) {
        if (definedSocialNetworkUIsResolved.has(identifier))
          return definedSocialNetworkUIsResolved.get(identifier);
        return null;
      }

      /***/
    },

    /***/ 72234: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ j: () => /* binding */ createNormalReactRoot,
        /* harmony export */
      });
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(82798);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(63423);
      /* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(67296);
      /* harmony import */ var _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(98193);
      /* harmony import */ var _masknet_theme__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(43021);

      function createNormalReactRoot(jsx, container) {
        var ref;
        if (!container)
          container =
            (ref = document.getElementById("root")) !== null && ref !== void 0
              ? ref
              : void 0;
        if (!container) {
          container = document.createElement("div");
          document.body.appendChild(container);
        }
        if (false) {
        }
        return (0,
        react_dom_client__WEBPACK_IMPORTED_MODULE_2__ /* .createRoot */.s)(
          container
        ).render(
          /*#__PURE__*/ (0, react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
            react__WEBPACK_IMPORTED_MODULE_1__.StrictMode,
            {
              children: /*#__PURE__*/ (0,
              react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                _masknet_theme__WEBPACK_IMPORTED_MODULE_4__ /* .DisableShadowRootContext.Provider */
                  .AZ.Provider,
                {
                  value: true,
                  children: /*#__PURE__*/ (0,
                  react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(
                    _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_3__ /* .ErrorBoundary */.SV,
                    {
                      children: jsx,
                    }
                  ),
                }
              ),
            }
          )
        );
      }

      /***/
    },

    /***/ 91557: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ D: () => /* binding */ useControlledDialog,
        /* harmony export */
      });
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(63423);

      function useControlledDialog() {
        const [open, setOpen] = (0,
        react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
        return {
          open,
          setOpen,
          onClose: () => setOpen(false),
          onOpen: () => setOpen(true),
        };
      }

      /***/
    },

    /***/ 63098: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ H: () => /* binding */ useMenu,
        /* harmony export */
      });
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(63423);
      /* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(64765);
      /* harmony import */ var _masknet_theme__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(43021);
      /* harmony import */ var react_use__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(52781);

      /**
       * A util hooks for easier to use `<Menu>`s.
       * @param menus Material UI `<MenuItem />` elements
       */ function useMenu(
        elements,
        anchorSibling = false,
        props,
        useShadowRoot = true
      ) {
        const [open, setOpen] = (0,
        react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
        const [anchorEl, setAnchorEl] = (0,
        react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
        const close = () => {
          setOpen(false);
          setAnchorEl(null);
        };
        const update = (0,
        react_use__WEBPACK_IMPORTED_MODULE_2__ /* ["default"] */.Z)();
        return [
          /*#__PURE__*/ (0, react__WEBPACK_IMPORTED_MODULE_0__.createElement)(
            useShadowRoot
              ? _masknet_theme__WEBPACK_IMPORTED_MODULE_1__ /* .ShadowRootMenu */.dy
              : _mui_material__WEBPACK_IMPORTED_MODULE_3__ /* ["default"] */.Z,
            {
              PaperProps:
                props === null || props === void 0 ? void 0 : props.paperProps,
              MenuListProps:
                props === null || props === void 0
                  ? void 0
                  : props.menuListProps,
              open,
              anchorEl,
              onClose: close,
              onClick: close,
              anchorOrigin:
                props === null || props === void 0
                  ? void 0
                  : props.anchorOrigin,
              transformOrigin:
                props === null || props === void 0
                  ? void 0
                  : props.transformOrigin,
            },
            elements === null || elements === void 0
              ? void 0
              : elements.map((element, key) =>
                  /*#__PURE__*/ (0,
                  react__WEBPACK_IMPORTED_MODULE_0__.isValidElement)(element)
                    ? /*#__PURE__*/ (0,
                      react__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(
                        element,
                        {
                          ...element.props,
                          key,
                        }
                      )
                    : element
                )
          ),
          (0, react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
            (anchorElOrEvent) => {
              let element;
              if (anchorElOrEvent instanceof HTMLElement) {
                element = anchorElOrEvent;
              } else {
                element = anchorElOrEvent.currentTarget;
              }
              var ref;
              // when the essential content of currentTarget would be closed over,
              //  we can set the anchorEl with currentTarget's bottom sibling to avoid it.
              const finalAnchor = anchorSibling
                ? (ref = element.nextElementSibling) !== null && ref !== void 0
                  ? ref
                  : undefined
                : element;
              setAnchorEl(finalAnchor);
              setOpen(true);
              // HACK: it seems like anchor doesn't work correctly
              // but a force repaint can solve the problem.
              window.requestAnimationFrame(update);
            },
            []
          ),
        ];
      }

      /***/
    },

    /***/ 54327: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ E: () => /* binding */ useSwitcher,
        /* harmony export */ M: () => /* binding */ useSettingsSwitcher,
        /* harmony export */
      });
      /* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(82798);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(63423);
      /* harmony import */ var _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(98193);
      /* harmony import */ var _extension_options_page_DashboardComponents_ActionButton__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(47906);

      function useSettingsSwitcher(settings, options, resolver) {
        const currentOption = (0,
        _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_2__ /* .useValueRef */.E)(
          settings
        );
        const nextOption = (0,
        react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
          if (options.length === 0) return;
          if (typeof currentOption === "undefined") return options[0];
          const indexOf = options.indexOf(currentOption);
          if (indexOf === -1) return;
          return indexOf === options.length - 1
            ? options[0]
            : options[indexOf + 1];
        }, [currentOption, options]);
        const onSwitch = (0,
        react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(() => {
          if (typeof nextOption !== "undefined") settings.value = nextOption;
        }, [nextOption]);
        if (options.length <= 1) return null;
        if (typeof nextOption === "undefined") return null;
        return /*#__PURE__*/ (0,
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          _extension_options_page_DashboardComponents_ActionButton__WEBPACK_IMPORTED_MODULE_3__ /* ["default"] */.ZP,
          {
            sx: {
              marginTop: 1,
            },
            color: "primary",
            variant: "contained",
            onClick: onSwitch,
            children: ["Switch to ", resolver(nextOption)],
          }
        );
      }
      function useSwitcher(currentOption, onSwitch, options, resolver) {
        const nextOption = (0,
        react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
          if (options.length === 0) return;
          if (typeof currentOption === "undefined") return options[0];
          const indexOf = options.indexOf(currentOption);
          if (indexOf === -1) return;
          return indexOf === options.length - 1
            ? options[0]
            : options[indexOf + 1];
        }, [currentOption, options]);
        if (options.length <= 1) return null;
        if (typeof nextOption === "undefined") return null;
        return /*#__PURE__*/ (0,
        react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(
          _extension_options_page_DashboardComponents_ActionButton__WEBPACK_IMPORTED_MODULE_3__ /* ["default"] */.ZP,
          {
            sx: {
              marginTop: 1,
            },
            color: "primary",
            variant: "contained",
            onClick: () => onSwitch(nextOption),
            children: ["Switch to ", resolver(nextOption)],
          }
        );
      }

      /***/
    },

    /***/ 78591: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      // EXPORTS
      __webpack_require__.d(__webpack_exports__, {
        $: () => /* reexport */ getAssetAsBlobURL,
      });

      // EXTERNAL MODULE: ./src/extension/service.ts
      var service = __webpack_require__(45925);
      // EXTERNAL MODULE: ../shared-base/src/index.ts + 4 modules
      var src = __webpack_require__(79226); // CONCATENATED MODULE: ./src/utils/suspends/getAssetAsBlobURL.ts
      /**
       * Fetch a file and turn it into blob URL.
       * This function must run in React concurrent mode.
       */ function getAssetAsBlobURL(url) {
        return (0, src /* getAssetAsBlobURL */.$I)(
          url,
          service /* default.Helper.fetch */.ZP.Helper.fetch
        );
      } // CONCATENATED MODULE: ./src/utils/suspends/index.ts

      /***/
    },

    /***/ 45606: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ B6: () => /* binding */ useErrorStyles,
        /* harmony export */ Kx: () =>
          /* binding */ useClassicMaskFullPageTheme,
        /* harmony export */ Nh: () => /* binding */ useColorStyles,
        /* harmony export */ Ql: () => /* binding */ extendsTheme,
        /* harmony export */ VJ: () => /* binding */ useClassicMaskSNSTheme,
        /* harmony export */
      });
      /* unused harmony export usePopupsMaskFullPageTheme */
      /* harmony import */ var _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_14__ =
        __webpack_require__(44162);
      /* harmony import */ var _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_14___default =
        /*#__PURE__*/ __webpack_require__.n(
          _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_14__
        );
      /* harmony import */ var _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(98193);
      /* harmony import */ var _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(79226);
      /* harmony import */ var _masknet_theme__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(43021);
      /* harmony import */ var _masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(48476);
      /* harmony import */ var _mui_material__WEBPACK_IMPORTED_MODULE_13__ =
        __webpack_require__(7744);
      /* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_9__ =
        __webpack_require__(90665);
      /* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_10__ =
        __webpack_require__(2531);
      /* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ =
        __webpack_require__(84176);
      /* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_17__ =
        __webpack_require__(51570);
      /* harmony import */ var _mui_material_colors__WEBPACK_IMPORTED_MODULE_18__ =
        __webpack_require__(99657);
      /* harmony import */ var _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ =
        __webpack_require__(57682);
      /* harmony import */ var lodash_unified__WEBPACK_IMPORTED_MODULE_11__ =
        __webpack_require__(9084);
      /* harmony import */ var lodash_unified__WEBPACK_IMPORTED_MODULE_12__ =
        __webpack_require__(46440);
      /* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ =
        __webpack_require__(63423);
      /* harmony import */ var _settings_settings__WEBPACK_IMPORTED_MODULE_5__ =
        __webpack_require__(21202);
      /* harmony import */ var _social_network__WEBPACK_IMPORTED_MODULE_6__ =
        __webpack_require__(61751);
      /* harmony import */ var use_subscription__WEBPACK_IMPORTED_MODULE_7__ =
        __webpack_require__(85848);
      /* harmony import */ var _social_network_adaptor_twitter_com_customization_twitter_color_schema_json__WEBPACK_IMPORTED_MODULE_8__ =
        __webpack_require__(88674);

      function getFontFamily(monospace) {
        // We want to look native.
        // Windows has no CJK sans monospace. Accommodate that.
        // We only use it for fingerprints anyway so CJK coverage ain't a problem... yet.
        const monofont = navigator.platform.startsWith("Win")
          ? "Consolas, monospace"
          : "monospace";
        // https://caniuse.com/font-family-system-ui
        // Firefox does NOT support yet it in any form on Windows, but tests indicate that it agrees with Edge in using the UI font for sans-serif:
        // Microsoft YaHei on zh-Hans-CN.
        return !monospace ? "-apple-system, system-ui, sans-serif" : monofont;
      }
      const base = {
        palette: {
          primary: {
            main: "#1c68f3",
          },
          secondary:
            _mui_material_colors__WEBPACK_IMPORTED_MODULE_9__ /* ["default"] */.Z,
          text: {
            hint: "rgba(0, 0, 0, 0.38)",
          },
        },
        typography: {
          fontFamily: getFontFamily(),
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 600,
            md: 1112,
            lg: 1280,
            xl: 1920,
          },
        },
        components: {
          MuiLink: {
            defaultProps: {
              underline: "hover",
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "unset",
                minWidth: "100px",
              },
            },
            defaultProps: {
              size: "small",
              disableElevation: true,
            },
          },
          MuiTab: {
            styleOverrides: {
              root: {
                textTransform: "unset",
                padding: "0",
                // up-sm
                "@media screen and (min-width: 600px)": {
                  minWidth: 160,
                },
              },
            },
          },
          MuiDialog: {
            styleOverrides: {
              paper: {
                borderRadius: "12px",
              },
            },
          },
        },
      };
      const lightThemePatch = {
        palette: {
          mode: "light",
        },
      };
      const darkThemePatch = {
        palette: {
          mode: "dark",
          background: {
            paper:
              _mui_material_colors__WEBPACK_IMPORTED_MODULE_10__ /* ["default"][900] */
                .Z[900],
          },
        },
        components: {
          MuiPaper: {
            // https://github.com/mui-org/material-ui/pull/25522
            styleOverrides: {
              root: {
                backgroundImage: "unset",
              },
            },
          },
        },
      };
      const baseTheme = (theme) => {
        if (theme === "light")
          return (0,
          lodash_unified__WEBPACK_IMPORTED_MODULE_11__ /* ["default"] */.Z)(
            (0,
            lodash_unified__WEBPACK_IMPORTED_MODULE_12__ /* ["default"] */.Z)(
              base
            ),
            lightThemePatch
          );
        return (0,
        lodash_unified__WEBPACK_IMPORTED_MODULE_11__ /* ["default"] */.Z)(
          (0, lodash_unified__WEBPACK_IMPORTED_MODULE_12__ /* ["default"] */.Z)(
            base
          ),
          darkThemePatch
        );
      };
      // Theme
      const MaskLightTheme = (0,
      _mui_material__WEBPACK_IMPORTED_MODULE_13__ /* ["default"] */.Z)(
        baseTheme("light")
      );
      const MaskDarkTheme = (0,
      _mui_material__WEBPACK_IMPORTED_MODULE_13__ /* ["default"] */.Z)(
        baseTheme("dark")
      );
      const staticSubscription = (0,
      _masknet_shared_base__WEBPACK_IMPORTED_MODULE_1__ /* .SubscriptionFromValueRef */.Jf)(
        new _dimensiondev_holoflows_kit__WEBPACK_IMPORTED_MODULE_14__.ValueRef(
          "light"
        )
      );
      function useClassicMaskSNSTheme() {
        var ref;
        const { current: provider } = (0,
        react__WEBPACK_IMPORTED_MODULE_4__.useRef)(
          ((ref =
            _social_network__WEBPACK_IMPORTED_MODULE_6__ /* .activatedSocialNetworkUI.customization.paletteMode */
              .LM.customization.paletteMode) === null || ref === void 0
            ? void 0
            : ref.current) || staticSubscription
        );
        const { current: usePostTheme = (t) => t } = (0,
        react__WEBPACK_IMPORTED_MODULE_4__.useRef)(
          _social_network__WEBPACK_IMPORTED_MODULE_6__ /* .activatedSocialNetworkUI.customization.useTheme */
            .LM.customization.useTheme
        );
        const palette = (0,
        use_subscription__WEBPACK_IMPORTED_MODULE_7__.useSubscription)(
          provider
        );
        const baseTheme1 = palette === "dark" ? MaskDarkTheme : MaskLightTheme;
        // TODO: support RTL?
        const [localization, isRTL] = useThemeLanguage();
        const theme = (0,
        _mui_material__WEBPACK_IMPORTED_MODULE_13__ /* ["default"] */.Z)(
          baseTheme1,
          localization
        );
        return usePostTheme(theme);
      }
      /**
       * @deprecated
       * - Popups: migrate to \@masknet/theme package
       */ function useClassicMaskFullPageTheme(overwrite) {
        const userPreference = (0,
        _masknet_theme__WEBPACK_IMPORTED_MODULE_2__.or)(
          overwrite === null || overwrite === void 0
            ? void 0
            : overwrite.forcePalette,
          (0,
          _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_0__ /* .useValueRef */.E)(
            _settings_settings__WEBPACK_IMPORTED_MODULE_5__ /* .appearanceSettings */.OF
          )
        );
        const systemPreference = matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        const finalPalette =
          userPreference ===
          _masknet_theme__WEBPACK_IMPORTED_MODULE_2__ /* .Appearance["default"] */
            .um["default"]
            ? systemPreference
            : userPreference;
        const baseTheme2 =
          finalPalette === "dark" ? MaskDarkTheme : MaskLightTheme;
        const [localization, isRTL] = useThemeLanguage();
        // TODO: support RTL
        return (0,
        _mui_material__WEBPACK_IMPORTED_MODULE_13__ /* ["default"] */.Z)(
          baseTheme2,
          localization
        );
      }
      /**
       * Only used in swap pages under popups, will replace it in the future
       */ function usePopupsMaskFullPageTheme() {
        const baseTheme3 = MaskLightTheme;
        setAutoFreeze(false);
        const PopupTheme = produce(baseTheme3, (theme) => {
          theme.palette.background.paper = "#ffffff";
          theme.palette.primary = {
            ...theme.palette.primary,
            main: "#1c68f3",
          };
          const colorSchema = twitterColorSchema.light;
          const colors = Object.keys(colorSchema);
          colors.forEach((color) => {
            if (typeof theme.palette[color] === "object") {
              Object.assign(theme.palette[color], colorSchema[color]);
            }
          });
          theme.palette.divider = colorSchema.divider;
          theme.palette.secondaryDivider = colorSchema.secondaryDivider;
          theme.components = theme.components || {};
          const smallQuery = `@media (max-width: ${theme.breakpoints.values.sm}px)`;
          theme.components.MuiButton = {
            defaultProps: {
              size: "medium",
              disableElevation: true,
              variant: "contained",
            },
            variants: [
              {
                props: {
                  variant: "sns",
                },
                style: {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.common.white,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                    color: theme.palette.common.white,
                  },
                  "&.Mui-disabled": {
                    opacity: 0.5,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.common.white,
                  },
                },
              },
              {
                props: {
                  color: "error",
                },
                style: {
                  backgroundColor: theme.palette.error.main,
                  color: theme.palette.common.white,
                  "&:hover": {
                    backgroundColor: "#f53b47",
                  },
                },
              },
            ],
            styleOverrides: {
              root: {
                borderRadius: 500,
                textTransform: "initial",
                fontWeight: 600,
                minHeight: 39,
                paddingLeft: 15,
                paddingRight: 15,
                boxShadow: "none",
                [smallQuery]: {
                  "&": {
                    height: 30,
                    minHeight: "auto !important",
                    padding: "0 14px !important",
                  },
                },
              },
              contained: {
                backgroundColor: theme.palette.text.primary,
                color: theme.palette.text.buttonText,
                "&.Mui-disabled": {
                  opacity: 0.5,
                  backgroundColor: theme.palette.text.primary,
                  color: theme.palette.text.buttonText,
                },
                "&:hover": {
                  backgroundColor: theme.palette.action.buttonHover,
                },
                [smallQuery]: {
                  "&": {
                    height: 30,
                    minHeight: "auto !important",
                    padding: "0 14px !important",
                  },
                },
              },
              containedSecondary: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.strong,
                "&:hover": {
                  color: theme.palette.action.buttonHover,
                  backgroundColor: theme.palette.action.bgHover,
                },
                "&.Mui-disabled": {
                  opacity: 0.5,
                  backgroundColor: theme.palette.background.default,
                  color: theme.palette.text.strong,
                },
              },
              outlined: {
                color: theme.palette.text.strong,
                borderColor: theme.palette.secondaryDivider,
                backgroundColor: "transparent",
                "&:hover": {
                  color: theme.palette.action.buttonHover,
                  borderColor: theme.palette.secondaryDivider,
                  backgroundColor: parseColor(theme.palette.text.primary)
                    .setAlpha(0.1)
                    .toRgbString(),
                },
                "&.Mui-disabled": {
                  opacity: 0.5,
                  color: theme.palette.text.strong,
                  backgroundColor: "transparent",
                },
              },
              sizeLarge: {
                minHeight: 40,
                paddingLeft: 30,
                paddingRight: 30,
                [smallQuery]: {
                  "&": {
                    height: 28,
                    minHeight: 28,
                    paddingLeft: 15,
                    paddingRight: 15,
                  },
                },
              },
              sizeSmall: {
                minHeight: 30,
                paddingLeft: 15,
                paddingRight: 15,
                [smallQuery]: {
                  "&": {
                    height: 25,
                    minHeight: 29,
                    paddingLeft: 10,
                    paddingRight: 10,
                  },
                },
              },
            },
          };
          theme.components.MuiPaper = {
            defaultProps: {
              elevation: 0,
            },
          };
          theme.components.MuiTab = {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          };
          theme.components.MuiChip = {
            styleOverrides: {
              root: {
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.strong,
              },
              colorPrimary: {
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.common.white,
                "&:hover": {
                  backgroundColor: parseColor(theme.palette.text.primary)
                    .setAlpha(0.1)
                    .toRgbString(),
                },
              },
            },
          };
          theme.components.MuiBackdrop = {
            styleOverrides: {
              root: {
                backgroundColor: theme.palette.action.mask,
              },
            },
          };
          theme.components.MuiTooltip = {
            styleOverrides: {
              tooltip: {
                backgroundColor: theme.palette.background.tipMask,
                color: theme.palette.text.buttonText,
                borderRadius: 8,
              },
              tooltipArrow: {
                backgroundColor: theme.palette.background.tipMask,
              },
            },
          };
          theme.components.MuiSnackbar = {
            styleOverrides: {
              root: {
                filter: `drop-shadow(0px 0px 16px ${theme.palette.background.messageShadow});`,
              },
            },
          };
        });
        return unstable_createMuiStrictModeTheme(PopupTheme);
      }
      function useThemeLanguage() {
        let language = (0,
        _masknet_shared_base_ui__WEBPACK_IMPORTED_MODULE_0__ /* .useValueRef */.E)(
          _settings_settings__WEBPACK_IMPORTED_MODULE_5__ /* .languageSettings */.pQ
        );
        // TODO: support auto language
        if (
          language ===
          _masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .LanguageOptions.__auto__ */
            .P7.__auto__
        )
          language =
            _masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .LanguageOptions.enUS */
              .P7.enUS;
        const displayLanguage = language;
        const langs = {
          [_masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .SupportedLanguages.enUS */
            .iu.enUS]:
            _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ /* .enUS */._z,
          [_masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .SupportedLanguages.jaJP */
            .iu.jaJP]:
            _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ /* .jaJP */.jz,
          [_masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .SupportedLanguages.koKR */
            .iu.koKR]:
            _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ /* .koKR */.uG,
          [_masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .SupportedLanguages.zhTW */
            .iu.zhTW]:
            _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ /* .zhTW */.cj,
          [_masknet_public_api__WEBPACK_IMPORTED_MODULE_3__ /* .SupportedLanguages.zhCN */
            .iu.zhCN]:
            _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ /* .zhCN */.U1,
        };
        return [
          langs[displayLanguage] ||
            _mui_material_locale_index__WEBPACK_IMPORTED_MODULE_15__ /* .enUS */._z,
          false,
        ];
      }
      const useColorStyles = (0,
      _masknet_theme__WEBPACK_IMPORTED_MODULE_2__ /* .makeStyles */.ZL)()(
        (theme) => {
          const dark = theme.palette.mode === "dark";
          return {
            error: {
              color: dark
                ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][500] */
                    .Z[500]
                : _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][900] */
                    .Z[900],
            },
            success: {
              color: dark
                ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_17__ /* ["default"][500] */
                    .Z[500]
                : _mui_material_colors__WEBPACK_IMPORTED_MODULE_17__ /* ["default"][800] */
                    .Z[800],
            },
            info: {
              color: dark
                ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_18__ /* ["default"][500] */
                    .Z[500]
                : _mui_material_colors__WEBPACK_IMPORTED_MODULE_18__ /* ["default"][800] */
                    .Z[800],
            },
          };
        }
      );
      const useErrorStyles = (0,
      _masknet_theme__WEBPACK_IMPORTED_MODULE_2__ /* .makeStyles */.ZL)()(
        (theme) => {
          const dark = theme.palette.mode === "dark";
          return {
            containedPrimary: {
              backgroundColor: dark
                ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][500] */
                    .Z[500]
                : _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][900] */
                    .Z[900],
              "&:hover": {
                backgroundColor: dark
                  ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][900] */
                      .Z[900]
                  : _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][700] */
                      .Z[700],
              },
            },
            outlinedPrimary: {
              borderColor: dark
                ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][500] */
                    .Z[500]
                : _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][900] */
                    .Z[900],
              color: dark
                ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][500] */
                    .Z[500]
                : _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][900] */
                    .Z[900],
              "&:hover": {
                borderColor: dark
                  ? _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][900] */
                      .Z[900]
                  : _mui_material_colors__WEBPACK_IMPORTED_MODULE_16__ /* ["default"][700] */
                      .Z[700],
              },
            },
          };
        }
      );
      function extendsTheme(extend) {
        return (theme) =>
          (0, lodash_unified__WEBPACK_IMPORTED_MODULE_11__ /* ["default"] */.Z)(
            (0,
            lodash_unified__WEBPACK_IMPORTED_MODULE_12__ /* ["default"] */.Z)(
              theme
            ),
            extend(theme)
          );
      }

      /***/
    },

    /***/ 96636: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ V: () => /* binding */ getBackupPreviewInfo,
        /* harmony export */ a: () => /* binding */ UpgradeBackupJSONFile,
        /* harmony export */
      });
      /* harmony import */ var _version_1__WEBPACK_IMPORTED_MODULE_2__ =
        __webpack_require__(61290);
      /* harmony import */ var _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(63151);
      /* harmony import */ var _version_0__WEBPACK_IMPORTED_MODULE_3__ =
        __webpack_require__(24213);
      /* harmony import */ var _version_2__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(49884);

      function UpgradeBackupJSONFile(json, identity) {
        if (
          (0,
          _version_2__WEBPACK_IMPORTED_MODULE_1__ /* .isBackupJSONFileVersion2 */.GI)(
            json
          )
        )
          return (0,
          _version_2__WEBPACK_IMPORTED_MODULE_1__ /* .patchNonBreakingUpgradeForBackupJSONFileVersion2 */.a6)(
            json
          );
        if (
          (0,
          _version_1__WEBPACK_IMPORTED_MODULE_2__ /* .isBackupJSONFileVersion1 */.RV)(
            json
          )
        )
          return (0,
          _version_2__WEBPACK_IMPORTED_MODULE_1__ /* .upgradeFromBackupJSONFileVersion1 */.nl)(
            (0,
            _version_1__WEBPACK_IMPORTED_MODULE_2__ /* .patchNonBreakingUpgradeForBackupJSONFileVersion1 */.z2)(
              json
            )
          );
        if (
          (0,
          _version_0__WEBPACK_IMPORTED_MODULE_3__ /* .isBackupJSONFileVersion0 */.m)(
            json
          ) &&
          identity
        ) {
          const upgraded = (0,
          _version_1__WEBPACK_IMPORTED_MODULE_2__ /* .upgradeFromBackupJSONFileVersion0 */.Bd)(
            json,
            identity
          );
          if (upgraded === null) return null;
          return (0,
          _version_2__WEBPACK_IMPORTED_MODULE_1__ /* .upgradeFromBackupJSONFileVersion1 */.nl)(
            upgraded
          );
        }
        return null;
      }
      function getBackupPreviewInfo(json) {
        var ref, ref1;
        return {
          personas: json.personas.length,
          accounts: json.personas.reduce(
            (a, b) => a + b.linkedProfiles.length,
            0
          ),
          posts: json.posts.length,
          contacts: json.profiles.length,
          relations: json.relations.length,
          files:
            ((ref = json.plugin) === null || ref === void 0
              ? void 0
              : (ref1 =
                  ref[
                    _masknet_plugin_infra__WEBPACK_IMPORTED_MODULE_0__ /* .PluginId.FileService */
                      .je.FileService
                  ]) === null || ref1 === void 0
              ? void 0
              : ref1.length) || 0,
          wallets: json.wallets.length,
          createdAt: json._meta_.createdAt,
        };
      }

      /***/
    },

    /***/ 13426: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ a: () =>
          /* reexport safe */ _JSON_latest__WEBPACK_IMPORTED_MODULE_0__.a,
        /* harmony export */
      });
      /* harmony import */ var _JSON_latest__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(96636);

      /***/
    },

    /***/ 48476: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ FW: () =>
          /* reexport safe */ _web__WEBPACK_IMPORTED_MODULE_0__.FW,
        /* harmony export */ P7: () =>
          /* reexport safe */ _web__WEBPACK_IMPORTED_MODULE_0__.P7,
        /* harmony export */ iu: () =>
          /* reexport safe */ _web__WEBPACK_IMPORTED_MODULE_0__.iu,
        /* harmony export */ td: () =>
          /* reexport safe */ _web__WEBPACK_IMPORTED_MODULE_0__.td,
        /* harmony export */ z4: () =>
          /* reexport safe */ _web__WEBPACK_IMPORTED_MODULE_0__.z4,
        /* harmony export */
      });
      /* harmony import */ var _web__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(34453);
      /* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(88430);
      // Following is the API that can be called from the native side.

      // Following is the API that implemented by the native side.

      /***/
    },

    /***/ 88672: /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ Y_: () => /* binding */ relativeRouteOf,
        /* harmony export */ mZ: () =>
          /* reexport safe */ _PopupRoutes__WEBPACK_IMPORTED_MODULE_0__.m,
        /* harmony export */ vq: () =>
          /* reexport safe */ _DashboardRoutes__WEBPACK_IMPORTED_MODULE_1__.v,
        /* harmony export */
      });
      /* harmony import */ var _PopupRoutes__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__(80847);
      /* harmony import */ var _DashboardRoutes__WEBPACK_IMPORTED_MODULE_1__ =
        __webpack_require__(26637);

      function relativeRouteOf(parent) {
        return (child) => {
          if (!child.startsWith(parent)) throw new Error();
          return child.slice(parent.length).replace(/^\//, "");
        };
      }

      /***/
    },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ loaded: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Flag the module as loaded
    /******/ module.loaded = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /******/ // expose the modules object (__webpack_modules__)
  /******/ __webpack_require__.m = __webpack_modules__;
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/amd options */
  /******/ (() => {
    /******/ __webpack_require__.amdO = {};
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/async module */
  /******/ (() => {
    /******/ var webpackThen =
      typeof Symbol === "function"
        ? Symbol("webpack then")
        : "__webpack_then__";
    /******/ var webpackExports =
      typeof Symbol === "function"
        ? Symbol("webpack exports")
        : "__webpack_exports__";
    /******/ var webpackError =
      typeof Symbol === "function"
        ? Symbol("webpack error")
        : "__webpack_error__";
    /******/ var completeQueue = (queue) => {
      /******/ if (queue) {
        /******/ queue.forEach((fn) => fn.r--);
        /******/ queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
        /******/
      }
      /******/
    };
    /******/ var completeFunction = (fn) => !--fn.r && fn();
    /******/ var queueFunction = (queue, fn) =>
      queue ? queue.push(fn) : completeFunction(fn);
    /******/ var wrapDeps = (deps) =>
      deps.map((dep) => {
        /******/ if (dep !== null && typeof dep === "object") {
          /******/ if (dep[webpackThen]) return dep;
          /******/ if (dep.then) {
            /******/ var queue = [];
            /******/ dep.then(
              (r) => {
                /******/ obj[webpackExports] = r;
                /******/ completeQueue(queue);
                /******/ queue = 0;
                /******/
              },
              (e) => {
                /******/ obj[webpackError] = e;
                /******/ completeQueue(queue);
                /******/ queue = 0;
                /******/
              }
            );
            /******/ var obj = {};
            /******/ obj[webpackThen] = (fn, reject) => (
              queueFunction(queue, fn), dep["catch"](reject)
            );
            /******/ return obj;
            /******/
          }
          /******/
        }
        /******/ var ret = {};
        /******/ ret[webpackThen] = (fn) => completeFunction(fn);
        /******/ ret[webpackExports] = dep;
        /******/ return ret;
        /******/
      });
    /******/ __webpack_require__.a = (module, body, hasAwait) => {
      /******/ var queue = hasAwait && [];
      /******/ var exports = module.exports;
      /******/ var currentDeps;
      /******/ var outerResolve;
      /******/ var reject;
      /******/ var isEvaluating = true;
      /******/ var nested = false;
      /******/ var whenAll = (deps, onResolve, onReject) => {
        /******/ if (nested) return;
        /******/ nested = true;
        /******/ onResolve.r += deps.length;
        /******/ deps.map((dep, i) => dep[webpackThen](onResolve, onReject));
        /******/ nested = false;
        /******/
      };
      /******/ var promise = new Promise((resolve, rej) => {
        /******/ reject = rej;
        /******/ outerResolve = () => (
          resolve(exports), completeQueue(queue), (queue = 0)
        );
        /******/
      });
      /******/ promise[webpackExports] = exports;
      /******/ promise[webpackThen] = (fn, rejectFn) => {
        /******/ if (isEvaluating) {
          return completeFunction(fn);
        }
        /******/ if (currentDeps) whenAll(currentDeps, fn, rejectFn);
        /******/ queueFunction(queue, fn);
        /******/ promise["catch"](rejectFn);
        /******/
      };
      /******/ module.exports = promise;
      /******/ body(
        (deps) => {
          /******/ currentDeps = wrapDeps(deps);
          /******/ var fn;
          /******/ var getResult = () =>
            currentDeps.map((d) => {
              /******/ if (d[webpackError]) throw d[webpackError];
              /******/ return d[webpackExports];
              /******/
            });
          /******/ var promise = new Promise((resolve, reject) => {
            /******/ fn = () => resolve(getResult);
            /******/ fn.r = 0;
            /******/ whenAll(currentDeps, fn, reject);
            /******/
          });
          /******/ return fn.r ? promise : getResult();
          /******/
        },
        (err) => (err && reject((promise[webpackError] = err)), outerResolve())
      );
      /******/ isEvaluating = false;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/chunk loaded */
  /******/ (() => {
    /******/ var deferred = [];
    /******/ __webpack_require__.O = (result, chunkIds, fn, priority) => {
      /******/ if (chunkIds) {
        /******/ priority = priority || 0;
        /******/ for (
          var i = deferred.length;
          i > 0 && deferred[i - 1][2] > priority;
          i--
        )
          deferred[i] = deferred[i - 1];
        /******/ deferred[i] = [chunkIds, fn, priority];
        /******/ return;
        /******/
      }
      /******/ var notFulfilled = Infinity;
      /******/ for (var i = 0; i < deferred.length; i++) {
        /******/ var [chunkIds, fn, priority] = deferred[i];
        /******/ var fulfilled = true;
        /******/ for (var j = 0; j < chunkIds.length; j++) {
          /******/ if (
            (priority & (1 === 0) || notFulfilled >= priority) &&
            Object.keys(__webpack_require__.O).every((key) =>
              __webpack_require__.O[key](chunkIds[j])
            )
          ) {
            /******/ chunkIds.splice(j--, 1);
            /******/
          } else {
            /******/ fulfilled = false;
            /******/ if (priority < notFulfilled) notFulfilled = priority;
            /******/
          }
          /******/
        }
        /******/ if (fulfilled) {
          /******/ deferred.splice(i--, 1);
          /******/ var r = fn();
          /******/ if (r !== undefined) result = r;
          /******/
        }
        /******/
      }
      /******/ return result;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/compat get default export */
  /******/ (() => {
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/ __webpack_require__.n = (module) => {
      /******/ var getter =
        module && module.__esModule
          ? /******/ () => module["default"]
          : /******/ () => module;
      /******/ __webpack_require__.d(getter, { a: getter });
      /******/ return getter;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/create fake namespace object */
  /******/ (() => {
    /******/ var getProto = Object.getPrototypeOf
      ? (obj) => Object.getPrototypeOf(obj)
      : (obj) => obj.__proto__;
    /******/ var leafPrototypes;
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 16: return value when it's Promise-like
    /******/ // mode & 8|1: behave like require
    /******/ __webpack_require__.t = function (value, mode) {
      /******/ if (mode & 1) value = this(value);
      /******/ if (mode & 8) return value;
      /******/ if (typeof value === "object" && value) {
        /******/ if (mode & 4 && value.__esModule) return value;
        /******/ if (mode & 16 && typeof value.then === "function")
          return value;
        /******/
      }
      /******/ var ns = Object.create(null);
      /******/ __webpack_require__.r(ns);
      /******/ var def = {};
      /******/ leafPrototypes = leafPrototypes || [
        null,
        getProto({}),
        getProto([]),
        getProto(getProto),
      ];
      /******/ for (
        var current = mode & 2 && value;
        typeof current == "object" && !~leafPrototypes.indexOf(current);
        current = getProto(current)
      ) {
        /******/ Object.getOwnPropertyNames(current).forEach(
          (key) => (def[key] = () => value[key])
        );
        /******/
      }
      /******/ def["default"] = () => value;
      /******/ __webpack_require__.d(ns, def);
      /******/ return ns;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/ensure chunk */
  /******/ (() => {
    /******/ __webpack_require__.f = {};
    /******/ // This file contains only the entry chunk.
    /******/ // The chunk loading function for additional chunks
    /******/ __webpack_require__.e = (chunkId) => {
      /******/ return Promise.all(
        Object.keys(__webpack_require__.f).reduce((promises, key) => {
          /******/ __webpack_require__.f[key](chunkId, promises);
          /******/ return promises;
          /******/
        }, [])
      );
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/get javascript chunk filename */
  /******/ (() => {
    /******/ // This function allow to reference async chunks
    /******/ __webpack_require__.u = (chunkId) => {
      /******/ // return url for filenames not based on template
      /******/ if (chunkId === 3617) return "js/npm.react-router.js";
      /******/ if (chunkId === 4162) return "js/npm.history.js";
      /******/ // return url for filenames based on template
      /******/ return (
        "js/chunk." +
        ({
          97: "npm.lodash.clonedeep",
          125: "npm.jsonschema",
          211: "npm-ns.balancer-labs.sor",
          237: "npm-ns.metaplex-foundation.mpl-metaplex",
          313: "npm.ef-core",
          405: "npm.react-feather",
          686: "npm-ns.metaplex-foundation.mpl-token-metadata",
          708: "npm.socket.io-client",
          855: "npm.json2csv",
          1077: "npm-ns.dimensiondev.mask-wallet-core",
          1183: "npm-ns.solana.spl-token-registry",
          1240: "npm-ns.ethersphere.bee-js",
          1246: "npm.eth-rpc-errors",
          1305: "npm-ns.metamask.inpage-provider",
          1432: "npm-ns.metaplex.js",
          1491: "npm.crypto-js",
          1528: "npm-ns.stablelib.ed25519",
          1546: "npm-ns.uniswap.v3-periphery",
          1626: "npm-ns.ethersproject.contracts",
          1822: "npm.key-did-provider-ed25519",
          2116: "npm.web-streams-polyfill",
          2245: "npm.react-highlight-words",
          2253: "npm.near-api-js",
          2261: "npm.wyvern-js",
          2297: "npm.3id-did-provider",
          2299: "npm.tweetnacl",
          2514: "npm.blob-polyfill",
          2598: "npm.react-hook-form",
          2735: "npm-ns.solana.web3.js",
          2917: "npm.did-jwt",
          2939: "npm-ns.uniswap.v3-sdk",
          2943: "npm.bip39",
          3375: "npm-ns.ethersproject.abstract-signer",
          3708: "npm.multiaddr",
          3742: "npm.multiformats",
          3850: "npm.arweave",
          4038: "npm.cborg",
          4049: "npm.qrcode-generator",
          4072: "npm.d3-scale",
          4270: "npm.rpc-utils",
          4428: "npm-ns.uniswap.v2-sdk",
          4520: "npm-ns.metaplex-foundation.mpl-core",
          4557: "npm.superstruct",
          5148: "npm-ns.ceramicstudio.idx",
          5255: "npm-ns.ceramicnetwork.common",
          5258: "MaskWallet",
          5334: "npm.store",
          5393: "npm-ns.ceramicnetwork.blockchain-utils-linking",
          5553: "npm.fortmatic",
          5578: "npm-ns.0xproject.utils",
          5678: "npm.d3-voronoi",
          5687: "npm-ns.solana.buffer-layout",
          5756: "npm.debug",
          5815: "npm-ns.blocto.protobuf",
          5891: "npm-ns.walletconnect.core",
          6045: "npm.ethereumjs-abi",
          6124: "npm.fast-json-patch",
          6191: "npm.mustache",
          6230: "npm.zod",
          6265: "npm-ns.metamask.eth-sig-util",
          6813: "npm-ns.portto.sdk",
          6912: "npm.react-draggable",
          6982: "npm-ns.improbable-eng.grpc-web",
          7015: "npm.d3-transition",
          7070: "npm.regenerator-runtime",
          7141: "npm.json-rpc-engine",
          7318: "npm-ns.cyberlab.cyberconnect",
          7372: "npm.ipfs-http-client",
          7425: "npm-ns.solana.spl-token",
          7531: "npm.d3-selection",
          7604: "npm-ns.ethersproject.providers",
          7696: "npm.color-convert",
          7765: "npm.engine.io-client",
          7913: "npm.lodash",
          8117: "npm.protobufjs",
          8331: "npm.opensea-js",
          8364: "npm.remarkable",
          8370: "npm.dompurify",
          8492: "npm.aes-js",
          8828: "npm-ns.ethersproject.wordlists",
          8857: "npm.borc",
          8936: "npm-ns.pedrouid.iso-crypto",
          9223: "npm-ns.metaplex-foundation.mpl-auction",
          9239: "npm-ns.blocto.fcl",
          9259: "npm.html-to-image",
          9271: "npm.rxjs",
          9278: "npm.axios",
          9447: "npm.engine.io-parser",
          9566: "npm.rpc-websockets",
          9706: "npm-ns.ceramicnetwork.streamid",
          9714: "npm.wyvern-schemas",
          9796: "npm-ns.snapshot-labs.snapshot.js",
          9834: "npm-ns.metaplex-foundation.mpl-token-vault",
        }[chunkId] || chunkId) +
        ".js"
      );
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/global */
  /******/ (() => {
    /******/ __webpack_require__.g = (function () {
      /******/ if (typeof globalThis === "object") return globalThis;
      /******/ try {
        /******/ return this || new Function("return this")();
        /******/
      } catch (e) {
        /******/ if (typeof window === "object") return window;
        /******/
      }
      /******/
    })();
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/load script */
  /******/ (() => {
    /******/ var isBrowser = !!(() => {
      try {
        if (typeof browser.runtime.getURL === "function") return true;
      } catch (e) {}
    })();
    /******/ var isChrome = !!(() => {
      try {
        if (typeof chrome.runtime.getURL === "function") return true;
      } catch (e) {}
    })();
    /******/ var runtime = isBrowser
      ? browser
      : isChrome
      ? chrome
      : {
          get runtime() {
            throw new Error("No chrome or browser runtime found");
          },
        };
    /******/ var __send__ = (msg) => {
      /******/ if (isBrowser) return runtime.runtime.sendMessage(msg);
      /******/ return new Promise((r) => runtime.runtime.sendMessage(msg, r));
      /******/
    };
    /******/ var classicLoader = (url, done, chunkId) => {
      /******/ __send__({ type: "WTW_INJECT", file: url }).then(done, (e) =>
        done(Object.assign(e, { type: "missing" }))
      );
      /******/
    };
    /******/ var scriptLoader = (url, done, chunkId) => {
      /******/ var script = document.createElement("script");
      /******/ script.src = url;
      /******/ script.onload = done;
      /******/ script.onerror = done;
      /******/ document.body.appendChild(script);
      /******/
    };
    /******/ var workerLoader = (url, done, chunkId) => {
      /******/ try {
        importScripts(url);
        done();
      } catch (e) {
        done(e);
      }
      /******/
    };
    /******/ var isWorker = typeof importScripts === "function";
    /******/ if (location.protocol.includes("-extension:"))
      __webpack_require__.l = isWorker ? workerLoader : scriptLoader;
    /******/ else if (!isWorker) __webpack_require__.l = classicLoader;
    /******/ else {
      throw new TypeError(
        "Unable to determinate the chunk loader: content script + Worker"
      );
    }
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/node module decorator */
  /******/ (() => {
    /******/ __webpack_require__.nmd = (module) => {
      /******/ module.paths = [];
      /******/ if (!module.children) module.children = [];
      /******/ return module;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/runtimeId */
  /******/ (() => {
    /******/ __webpack_require__.j = 9966;
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/trusted types policy */
  /******/ (() => {
    /******/ var policy;
    /******/ __webpack_require__.tt = () => {
      /******/ // Create Trusted Type policy if Trusted Types are available and the policy doesn't exist yet.
      /******/ if (policy === undefined) {
        /******/ policy = {
          /******/ createScriptURL: (url) => url,
          /******/
        };
        /******/ if (
          typeof trustedTypes !== "undefined" &&
          trustedTypes.createPolicy
        ) {
          /******/ policy = trustedTypes.createPolicy("webpack", policy);
          /******/
        }
        /******/
      }
      /******/ return policy;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/trusted types script url */
  /******/ (() => {
    /******/ __webpack_require__.tu = (url) =>
      __webpack_require__.tt().createScriptURL(url);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/wasm loading */
  /******/ (() => {
    /******/ __webpack_require__.v = (
      exports,
      wasmModuleId,
      wasmModuleHash,
      importsObj
    ) => {
      /******/ var req = fetch(
        __webpack_require__.p + "" + wasmModuleHash + ".module.wasm"
      );
      /******/ if (typeof WebAssembly.instantiateStreaming === "function") {
        /******/ return WebAssembly.instantiateStreaming(req, importsObj)
          /******/ .then((res) => Object.assign(exports, res.instance.exports));
        /******/
      }
      /******/ return req
        /******/ .then((x) => x.arrayBuffer())
        /******/ .then((bytes) => WebAssembly.instantiate(bytes, importsObj))
        /******/ .then((res) => Object.assign(exports, res.instance.exports));
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/publicPath */
  /******/ (() => {
    /******/ var isBrowser = !!(() => {
      try {
        if (typeof browser.runtime.getURL === "function") return true;
      } catch (e) {}
    })();
    /******/ var isChrome = !!(() => {
      try {
        if (typeof chrome.runtime.getURL === "function") return true;
      } catch (e) {}
    })();
    /******/ var runtime = isBrowser
      ? browser
      : isChrome
      ? chrome
      : {
          get runtime() {
            throw new Error("No chrome or browser runtime found");
          },
        };
    /******/ var path = "/";
    /******/ __webpack_require__.p =
      typeof importScripts === "function" ? path : runtime.runtime.getURL(path);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/jsonp chunk loading */
  /******/ (() => {
    /******/ __webpack_require__.b = document.baseURI || self.location.href;
    /******/
    /******/ // object to store loaded and loading chunks
    /******/ // undefined = chunk not loaded, null = chunk preloaded/prefetched
    /******/ // [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
    /******/ var installedChunks = {
      /******/ 9966: 0,
      /******/
    };
    /******/
    /******/ __webpack_require__.f.j = (chunkId, promises) => {
      /******/ // JSONP chunk loading for javascript
      /******/ var installedChunkData = __webpack_require__.o(
        installedChunks,
        chunkId
      )
        ? installedChunks[chunkId]
        : undefined;
      /******/ if (installedChunkData !== 0) {
        // 0 means "already installed".
        /******/
        /******/ // a Promise means "currently loading".
        /******/ if (installedChunkData) {
          /******/ promises.push(installedChunkData[2]);
          /******/
        } else {
          /******/ if (true) {
            // all chunks have JS
            /******/ // setup Promise in chunk cache
            /******/ var promise = new Promise(
              (resolve, reject) =>
                (installedChunkData = installedChunks[chunkId] =
                  [resolve, reject])
            );
            /******/ promises.push((installedChunkData[2] = promise));
            /******/
            /******/ // start chunk loading
            /******/ var url =
              __webpack_require__.p + __webpack_require__.u(chunkId);
            /******/ // create error before stack unwound to get useful stacktrace later
            /******/ var error = new Error();
            /******/ var loadingEnded = (event) => {
              /******/ if (__webpack_require__.o(installedChunks, chunkId)) {
                /******/ installedChunkData = installedChunks[chunkId];
                /******/ if (installedChunkData !== 0)
                  installedChunks[chunkId] = undefined;
                /******/ if (installedChunkData) {
                  /******/ var errorType =
                    event && (event.type === "load" ? "missing" : event.type);
                  /******/ var realSrc =
                    event && event.target && event.target.src;
                  /******/ error.message =
                    "Loading chunk " +
                    chunkId +
                    " failed.\n(" +
                    errorType +
                    ": " +
                    realSrc +
                    ")";
                  /******/ error.name = "ChunkLoadError";
                  /******/ error.type = errorType;
                  /******/ error.request = realSrc;
                  /******/ installedChunkData[1](error);
                  /******/
                }
                /******/
              }
              /******/
            };
            /******/ __webpack_require__.l(
              url,
              loadingEnded,
              "chunk-" + chunkId,
              chunkId
            );
            /******/
          } else {
          }
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
    /******/ // no prefetching
    /******/
    /******/ // no preloaded
    /******/
    /******/ // no HMR
    /******/
    /******/ // no HMR manifest
    /******/
    /******/ __webpack_require__.O.j = (chunkId) =>
      installedChunks[chunkId] === 0;
    /******/
    /******/ // install a JSONP callback for chunk loading
    /******/ var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
      /******/ var [chunkIds, moreModules, runtime] = data;
      /******/ // add "moreModules" to the modules object,
      /******/ // then flag all "chunkIds" as loaded and fire callback
      /******/ var moduleId,
        chunkId,
        i = 0;
      /******/ if (chunkIds.some((id) => installedChunks[id] !== 0)) {
        /******/ for (moduleId in moreModules) {
          /******/ if (__webpack_require__.o(moreModules, moduleId)) {
            /******/ __webpack_require__.m[moduleId] = moreModules[moduleId];
            /******/
          }
          /******/
        }
        /******/ if (runtime) var result = runtime(__webpack_require__);
        /******/
      }
      /******/ if (parentChunkLoadingFunction) parentChunkLoadingFunction(data);
      /******/ for (; i < chunkIds.length; i++) {
        /******/ chunkId = chunkIds[i];
        /******/ if (
          __webpack_require__.o(installedChunks, chunkId) &&
          installedChunks[chunkId]
        ) {
          /******/ installedChunks[chunkId][0]();
          /******/
        }
        /******/ installedChunks[chunkId] = 0;
        /******/
      }
      /******/ return __webpack_require__.O(result);
      /******/
    };
    /******/
    /******/ var chunkLoadingGlobal = (globalThis[
      "webpackChunk_masknet_extension"
    ] = globalThis["webpackChunk_masknet_extension"] || []);
    /******/ chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
    /******/ chunkLoadingGlobal.push = webpackJsonpCallback.bind(
      null,
      chunkLoadingGlobal.push.bind(chunkLoadingGlobal)
    );
    /******/
  })();
  /******/
  /************************************************************************/
  /******/
  /******/ // startup
  /******/ // Load entry module and return exports
  /******/ // This entry module depends on other loaded chunks and execution need to be delayed
  /******/ __webpack_require__.O(
    undefined,
    [
      5638, 2698, 7871, 9759, 3294, 2486, 4227, 4544, 5737, 187, 3883, 8136,
      3147, 8019, 8712, 9227, 5229, 6316, 3693, 3758, 4570, 7822, 7856, 2118,
      400, 3453, 5132, 1440, 12, 2619, 5838, 3142, 5105, 3846, 2162, 8129, 5951,
      2752, 7849, 7512, 5178, 6565, 9744, 444, 6160, 4278, 9197, 8000, 4960,
      102, 253, 572, 8547, 8145, 5313, 551, 2908, 2088, 3981, 1696, 3638, 1555,
      516, 2974, 3832, 9141, 159, 6067, 234, 9737, 79, 4590, 2891, 8393, 5784,
      4586, 9855, 4029, 433, 9697, 3619, 2222, 9580, 7595, 6669, 5122, 5022,
      9291, 6612, 750,
    ],
    () => __webpack_require__(85159)
  );
  /******/ var __webpack_exports__ = __webpack_require__.O(
    undefined,
    [
      5638, 2698, 7871, 9759, 3294, 2486, 4227, 4544, 5737, 187, 3883, 8136,
      3147, 8019, 8712, 9227, 5229, 6316, 3693, 3758, 4570, 7822, 7856, 2118,
      400, 3453, 5132, 1440, 12, 2619, 5838, 3142, 5105, 3846, 2162, 8129, 5951,
      2752, 7849, 7512, 5178, 6565, 9744, 444, 6160, 4278, 9197, 8000, 4960,
      102, 253, 572, 8547, 8145, 5313, 551, 2908, 2088, 3981, 1696, 3638, 1555,
      516, 2974, 3832, 9141, 159, 6067, 234, 9737, 79, 4590, 2891, 8393, 5784,
      4586, 9855, 4029, 433, 9697, 3619, 2222, 9580, 7595, 6669, 5122, 5022,
      9291, 6612, 750,
    ],
    () => __webpack_require__(42038)
  );
  /******/ __webpack_exports__ = __webpack_require__.O(__webpack_exports__);
  /******/
  /******/
})();
