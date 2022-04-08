import * as $protobuf from "protobufjs";
/** Namespace pb. */
export namespace pb {

    /** Constant enum. */
    enum Constant {
        Constant_NULL = 0,
        MsgHead_Len = 10,
        MsgMaxBody_Len = 1024000
    }

    /** ErrorCode enum. */
    enum ErrorCode {
        CS_OK = 0,
        CS_UNKNOW = 1,
        CS_SERVER_ERROR = 2,
        CS_INVALID_PARAMETER = 3,
        CS_INVALID_ACCOUNT = 4,
        CS_INVALID_PASSWORD = 5,
        CS_TIMEOUT = 6,
        CS_CHECK_FAILURE = 7,
        CS_CHECK_FAILURE_CAPITAL = 8,
        CS_CHECK_FAILURE_STOCK = 9,
        CS_CHECK_FAILURE_ORDER = 10,
        CS_NO_TRADING_TIME = 11,
        CS_NO_REGISTRY_TIME = 12,
        CS_NO_REGISTRY = 13,
        CS_ALREADY_REGISTRY = 14,
        CS_CHECK_FAILURE_CGDS_ID = 15,
        CS_CHECK_FAILURE_TIME = 16,
        CS_CHECK_FAILURE_PROPERTY = 17,
        CS_CHECK_FAILURE_TOKEN = 18,
        CS_ALREADY_UNLOCK = 19,
        CS_CHECK_PHONE_UNREGISTRY = 20,
        CS_CHECK_PHONE_UNBOUND = 21,
        CS_CHECK_ACCOUNT_FORBIDDEN = 22,
        CS_INVALID_SMSCODE = 23,
        CS_CHECK_FAILURE_ONCE = 24,
        CS_PAYMENT_FAILURE = 25,
        CS_ROOM_INVALID = 100,
        CS_ROOM_FULL = 101,
        CS_ROOM_FAIL_CHECKIN = 102,
        CS_ROOM_NOT_READY = 103
    }

    /** MessageId enum. */
    enum MessageId {
        MessageId_NULL = 0,
        Cmd_Save_Stock2Db = 101,
        Cmd_Make_StockList = 103,
        Sync_S2C_QuoteItem = 1000,
        Sync_S2C_GameProperty = 1002,
        Sync_S2C_GameCounter = 1004,
        Sync_S2C_GameSmxl = 1006,
        Sync_S2C_GameCg = 1008,
        Sync_S2C_GameMncg = 1010,
        Sync_S2C_GameCgds = 1012,
        Sync_S2C_FirstLoginToday = 1014,
        Sync_S2C_GameCg_GD = 1016,
        Sync_S2C_GameTimes = 1018,
        Sync_S2C_StockOrderResult = 1020,
        Sync_S2C_MutipleLogin = 1022,
        Sync_S2C_TaskProgress = 1024,
        Sync_S2C_ActivityConf = 1026,
        Sync_S2C_GameCgdsItem = 1028,
        Sync_S2C_GoldAwardPrompt = 1030,
        Sync_S2C_UnregistryAccount = 1032,
        Sync_S2C_CgdsConf = 1034,
        Sync_S2C_RecommendStock = 1036,
        Sync_S2C_InviterState = 1037,
        Sync_S2C_Broadcast = 1100,
        Sync_S2C_Message = 1102,
        Sync_C2S_GameHeart = 1200,
        Sync_C2S_Message = 1202,
        Sync_C2S_PaymentOk = 1204,
        Req_QuoteSubscribe = 2001,
        Rep_QuoteSubscribe = 2002,
        Req_QuoteQuery = 2003,
        Rep_QuoteQuery = 2004,
        Req_QuoteQueryFuture = 2005,
        Rep_QuoteQueryFuture = 2006,
        Req_IsTradingDay = 2007,
        Rep_IsTradingDay = 2008,
        Req_QueryTradingDay = 2009,
        Rep_QueryTradingDay = 2010,
        Req_QueryAiStockList = 2011,
        Rep_QueryAiStockList = 2012,
        Req_QueryAiSignal = 2013,
        Rep_QueryAiSignal = 2014,
        Req_EditAiStockList = 2015,
        Rep_EditAiStockList = 2016,
        Req_RecommendStock = 2017,
        Rep_RecommendStock = 2018,
        Req_Hall_UploadIcon = 3001,
        Rep_Hall_UploadIcon = 3002,
        Req_Hall_DownloadIcon = 3003,
        Rep_Hall_DownploadIcon = 3004,
        Req_Hall_EditIcon = 3005,
        Rep_Hall_EditIcon = 3006,
        Req_Hall_EditNick = 3007,
        Rep_Hall_EditNick = 3008,
        Req_Hall_EditLocation = 3009,
        Rep_Hall_EditLocation = 3010,
        Req_Hall_EditGender = 3011,
        Rep_Hall_EditGender = 3012,
        Req_Hall_BackBag = 3013,
        Rep_Hall_BackBag = 3014,
        Req_Hall_GetItem = 3015,
        Rep_Hall_GetItem = 3016,
        Req_Hall_EditFavorList = 3017,
        Rep_Hall_EditFavorList = 3018,
        Req_Hall_QueryPlayer = 3019,
        Rep_Hall_QueryPlayer = 3020,
        Req_Hall_SaveStudyProgress = 3021,
        Rep_Hall_SaveStudyProgress = 3022,
        Req_Hall_GetDailyTaskAward = 3023,
        Rep_Hall_GetDailyTaskAward = 3024,
        Req_Hall_UnlockGame = 3025,
        Rep_Hall_UnlockGame = 3026,
        Req_Hall_GetWeeklyAward = 3027,
        Rep_Hall_GetWeeklyAward = 3028,
        Req_Hall_QueryEventLog = 3029,
        Rep_Hall_QueryEventLog = 3030,
        Req_Hall_ShopOrder = 3031,
        Rep_Hall_ShopOrder = 3032,
        Req_Hall_ShopOrderQuery = 3033,
        Rep_Hall_ShopOrderQuery = 3034,
        Req_Hall_MobileBind = 3035,
        Rep_Hall_MobileBind = 3036,
        Req_Hall_ResetGameCounter = 3037,
        Rep_Hall_ResetGameCounter = 3038,
        Req_Hall_GetLevelRanking = 3039,
        Rep_Hall_GetLevelRanking = 3040,
        Req_Hall_GetFameRanking = 3041,
        Rep_Hall_GetFameRanking = 3042,
        Req_Hall_GetFameRankingWeekly = 3043,
        Rep_Hall_GetFameRankingWeekly = 3044,
        Req_Hall_GetActivityLogs = 3045,
        Rep_Hall_GetActivityLogs = 3046,
        Req_Hall_GetDailyAdAward = 3047,
        Rep_Hall_GetDailyAdAward = 3048,
        Req_Hall_Get7Award = 3049,
        Rep_Hall_Get7Award = 3050,
        Req_Hall_GetBrokenAward = 3051,
        Rep_Hall_GetBrokenAward = 3052,
        Req_Hall_Exchange = 3053,
        Rep_Hall_Exchange = 3054,
        Req_Hall_GetInviterAward = 3055,
        Rep_Hall_GetInviterAward = 3056,
        Req_Hall_Unregistry = 3997,
        Rep_Hall_Unregistry = 3998,
        Req_Hall_Logout = 3999,
        Rep_Hall_Logout = 4000,
        Req_Game_Login = 4001,
        Rep_Game_Login = 4002,
        Req_Game_Start = 4003,
        Rep_Game_Start = 4004,
        Req_Game_Over = 4005,
        Rep_Game_Over = 4006,
        Req_Game_QueryGameResult = 4007,
        Rep_Game_QueryGameResult = 4008,
        Req_Game_GetGameOperation = 4009,
        Rep_Game_GetGameOperation = 4010,
        Req_Game_SmxlReport = 4011,
        Rep_Game_SmxlReport = 4012,
        Req_Game_SmxlReset = 4013,
        Rep_Game_SmxlReset = 4014,
        Req_Game_CgsGetConf = 4015,
        Rep_Game_CgsGetConf = 4016,
        Req_Game_CgsGetClearanceRank = 4017,
        Rep_Game_CgsGetClearanceRank = 4018,
        Req_Game_CgsGetStageRank = 4019,
        Rep_Game_CgsGetStageRank = 4020,
        Req_Game_CgsGetSeasonRank = 4021,
        Rep_Game_CgsGetSeasonRank = 4022,
        Req_Game_CgsGetStageAward = 4023,
        Rep_Game_CgsGetStageAward = 4024,
        Req_Game_OrderQuery = 4025,
        Rep_Game_OrderQuery = 4026,
        Req_Game_Order = 4027,
        Rep_Game_Order = 4028,
        Req_Game_OrderCancel = 4029,
        Rep_Game_OrderCancel = 4030,
        Req_Game_MncgExchange = 4031,
        Rep_Game_MncgExchange = 4032,
        Req_Game_MncgEditStockList = 4033,
        Rep_Game_MncgEditStockList = 4034,
        Req_Game_CgdsList = 4035,
        Rep_Game_CgdsList = 4036,
        Req_Game_CgdsReg = 4037,
        Rep_Game_CgdsReg = 4038,
        Req_Game_CgdsRanking = 4039,
        Rep_Game_CgdsRanking = 4040,
        Req_Game_ZsjcBettingList = 4041,
        Rep_Game_ZsjcBettingList = 4042,
        Req_Game_ZsjcBet = 4043,
        Rep_Game_ZsjcBet = 4044,
        Req_Game_ZsjcRanking = 4045,
        Rep_Game_ZsjcRanking = 4046,
        Req_Game_ZsjcPlayerBettingList = 4047,
        Rep_Game_ZsjcPlayerBettingList = 4048,
        Req_Game_ZsjcBettingResultList = 4049,
        Rep_Game_ZsjcBettingResultList = 4050,
        Req_Room_Create = 5003,
        Rep_Room_Create = 5004,
        Req_Room_Enter = 5005,
        Rep_Room_Enter = 5006,
        Req_Room_Leave = 5007,
        Rep_Room_Leave = 5008,
        Req_Room_Ready = 5009,
        Rep_Room_Ready = 5010,
        Sync_Room_Enter = 5200,
        Sync_Room_Leave = 5202,
        Sync_Room_Enter_Self = 5204,
        Sync_Room_Leave_Self = 5206,
        Sync_Room_LostConn = 5208,
        Sync_Room_ReConn = 5210,
        Sync_Room_Ready = 5212,
        Sync_Room_GameStatus = 5214,
        Sync_Room_GameOp = 5216,
        Sync_Room_GameResult = 5218,
        S2S_HeartBeat = 10001,
        S2S_Update_PlayerProperty = 10003,
        S2S_Update_PlayerGameCounter = 10005,
        S2S_OrderCancel = 10007,
        S2S_Sync_Cgds = 10009,
        S2S_Set_CgdsTitle = 10011,
        S2S_Set_CgdsLogo = 10013,
        S2S_Set_CgdsUrl = 10015,
        S2S_Set_CgdsConf = 10017,
        S2S_Set_CgdsAward = 10019,
        S2S_Open_Cgds = 10021,
        S2S_Close_Cgds = 10023,
        S2S_Reload_Cgds = 10025,
        S2S_Reload_GameConf = 10027,
        S2S_Sync_ZsjcBetting = 10028,
        S2S_Sync_ZsjcState = 10030,
        S2S_Update_DailyTaskProgress = 10032,
        S2S_Sync_Pay = 10034,
        S2S_Sync_PaymentQuery = 10036
    }

    /** Properties of a MessageHead. */
    interface IMessageHead {

        /** MessageHead messageId */
        messageId?: (number|null);

        /** MessageHead messageLen */
        messageLen?: (number|null);
    }

    /** Represents a MessageHead. */
    class MessageHead implements IMessageHead {

        /**
         * Constructs a new MessageHead.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMessageHead);

        /** MessageHead messageId. */
        public messageId: number;

        /** MessageHead messageLen. */
        public messageLen: number;

        /**
         * Creates a new MessageHead instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessageHead instance
         */
        public static create(properties?: pb.IMessageHead): pb.MessageHead;

        /**
         * Encodes the specified MessageHead message. Does not implicitly {@link pb.MessageHead.verify|verify} messages.
         * @param message MessageHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMessageHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageHead message, length delimited. Does not implicitly {@link pb.MessageHead.verify|verify} messages.
         * @param message MessageHead message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMessageHead, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageHead message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.MessageHead;

        /**
         * Decodes a MessageHead message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MessageHead;

        /**
         * Verifies a MessageHead message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MessageHead message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageHead
         */
        public static fromObject(object: { [k: string]: any }): pb.MessageHead;

        /**
         * Creates a plain object from a MessageHead message. Also converts values to other types if specified.
         * @param message MessageHead
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.MessageHead, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageHead to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ErrorInfo. */
    interface IErrorInfo {

        /** ErrorInfo code */
        code?: (number|null);

        /** ErrorInfo err */
        err?: (string|null);
    }

    /** Represents an ErrorInfo. */
    class ErrorInfo implements IErrorInfo {

        /**
         * Constructs a new ErrorInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IErrorInfo);

        /** ErrorInfo code. */
        public code: number;

        /** ErrorInfo err. */
        public err: string;

        /**
         * Creates a new ErrorInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ErrorInfo instance
         */
        public static create(properties?: pb.IErrorInfo): pb.ErrorInfo;

        /**
         * Encodes the specified ErrorInfo message. Does not implicitly {@link pb.ErrorInfo.verify|verify} messages.
         * @param message ErrorInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IErrorInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ErrorInfo message, length delimited. Does not implicitly {@link pb.ErrorInfo.verify|verify} messages.
         * @param message ErrorInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IErrorInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ErrorInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ErrorInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ErrorInfo;

        /**
         * Decodes an ErrorInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ErrorInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ErrorInfo;

        /**
         * Verifies an ErrorInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ErrorInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ErrorInfo
         */
        public static fromObject(object: { [k: string]: any }): pb.ErrorInfo;

        /**
         * Creates a plain object from an ErrorInfo message. Also converts values to other types if specified.
         * @param message ErrorInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ErrorInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ErrorInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VoidRequest. */
    interface IVoidRequest {
    }

    /** Represents a VoidRequest. */
    class VoidRequest implements IVoidRequest {

        /**
         * Constructs a new VoidRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IVoidRequest);

        /**
         * Creates a new VoidRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VoidRequest instance
         */
        public static create(properties?: pb.IVoidRequest): pb.VoidRequest;

        /**
         * Encodes the specified VoidRequest message. Does not implicitly {@link pb.VoidRequest.verify|verify} messages.
         * @param message VoidRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IVoidRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VoidRequest message, length delimited. Does not implicitly {@link pb.VoidRequest.verify|verify} messages.
         * @param message VoidRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IVoidRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VoidRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VoidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.VoidRequest;

        /**
         * Decodes a VoidRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VoidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.VoidRequest;

        /**
         * Verifies a VoidRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VoidRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VoidRequest
         */
        public static fromObject(object: { [k: string]: any }): pb.VoidRequest;

        /**
         * Creates a plain object from a VoidRequest message. Also converts values to other types if specified.
         * @param message VoidRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.VoidRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VoidRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a VoidReply. */
    interface IVoidReply {
    }

    /** Represents a VoidReply. */
    class VoidReply implements IVoidReply {

        /**
         * Constructs a new VoidReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IVoidReply);

        /**
         * Creates a new VoidReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns VoidReply instance
         */
        public static create(properties?: pb.IVoidReply): pb.VoidReply;

        /**
         * Encodes the specified VoidReply message. Does not implicitly {@link pb.VoidReply.verify|verify} messages.
         * @param message VoidReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IVoidReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified VoidReply message, length delimited. Does not implicitly {@link pb.VoidReply.verify|verify} messages.
         * @param message VoidReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IVoidReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a VoidReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns VoidReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.VoidReply;

        /**
         * Decodes a VoidReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns VoidReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.VoidReply;

        /**
         * Verifies a VoidReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a VoidReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns VoidReply
         */
        public static fromObject(object: { [k: string]: any }): pb.VoidReply;

        /**
         * Creates a plain object from a VoidReply message. Also converts values to other types if specified.
         * @param message VoidReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.VoidReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this VoidReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** FeeType enum. */
    enum FeeType {
        FeeType_NULL = 0,
        FeeType_RMB = 1,
        FeeType_Diamond = 2,
        FeeType_Coupon = 3
    }

    /** PaymentType enum. */
    enum PaymentType {
        PaymentType_NULL = 0,
        WechatPay = 1,
        ApplePay = 2,
        WechatMiniPay = 3
    }

    /** ItemOrderState enum. */
    enum ItemOrderState {
        ItemOrderState_Init = 0,
        Pay = 1,
        EMS = 2
    }

    /** MessageType enum. */
    enum MessageType {
        MessageType_NULL = 0,
        SystemNotice = 1,
        Popup_Adv = 2,
        Chat = 9,
        RoomChat = 10,
        RoomInvite = 11
    }

    /** GameType enum. */
    enum GameType {
        GameType_NULL = 0,
        ShuangMang = 3,
        DingXiang = 4,
        FenShi = 5,
        ZhiBiao = 10,
        TiaoJianDan = 11,
        QiHuo = 6,
        TiaoZhan = 16,
        JJ_PK = 1,
        JJ_DuoKong = 2,
        JJ_ChuangGuan = 9,
        JJ_QiHuo = 15,
        MoNiChaoGu = 12,
        ChaoGuDaSai = 13,
        GeGuJingChai = 7,
        DaPanJingChai = 8,
        MaxGameType = 30
    }

    /** GamePropertyId enum. */
    enum GamePropertyId {
        Gold = 0,
        Diamond = 1,
        Vip = 2,
        Exp = 3,
        Level = 4,
        Fame = 5,
        Coupon = 6,
        SVip = 7,
        UnlockDxxl = 20,
        UnlockQhxl = 21,
        UnlockTjdxl = 22,
        UnlockZbxl = 23,
        SVipExpiration = 25,
        K = 26,
        Tester = 27,
        VipExpiration = 28,
        RMB = 29,
        Max = 30
    }

    /** EventId enum. */
    enum EventId {
        EventId_NULL = 0,
        EventId_WeeklyAward = 1,
        EventId_Zsjc = 2
    }

    /** TaskId enum. */
    enum TaskId {
        Pk = 0,
        Dk = 1,
        Zsjc = 2,
        Ggjc = 3,
        Cg = 4,
        MaxDailyTaskId = 5,
        MaxStudyTaskId = 8
    }

    /** GameOperationId enum. */
    enum GameOperationId {
        GameOperationId_NULL = 0,
        Ask = 1,
        Bid = 2,
        Wait = 3,
        Hold = 4,
        Bid_Force = 5,
        Ask_Force = 6,
        Short = 8,
        Long = 9,
        END = 150
    }

    /** GamePkResult enum. */
    enum GamePkResult {
        Draw = 0,
        Win = 1,
        Lost = 2,
        Giveup = -1
    }

    /** ExchangeType enum. */
    enum ExchangeType {
        ExchangeType_NULL = 0,
        ExchangeType_K2Coupon = 1,
        ExchangeType_K2Capital = 2
    }

    /** ExchangeDirection enum. */
    enum ExchangeDirection {
        ExchangeDirection_NULL = 0,
        Forward = 1,
        Reverse = 2
    }

    /** OrderType enum. */
    enum OrderType {
        OrderType_NULL = 0,
        AskMarket = 1,
        BidMarket = 2,
        AskLimit = 3,
        BidLimit = 4,
        AskLimit_Cancel = 5,
        BidLimit_Cancel = 6,
        BidMarket_Auto = 7
    }

    /** OrderState enum. */
    enum OrderState {
        Init = 0,
        Partial = 1,
        Done = 2,
        ManulCancel = 3,
        AutoCancel = 4
    }

    /** Properties of a BackbagGrid. */
    interface IBackbagGrid {

        /** BackbagGrid properties */
        properties?: (string|null);

        /** BackbagGrid ts */
        ts?: (number|Long|null);

        /** BackbagGrid memo */
        memo?: (string|null);
    }

    /** Represents a BackbagGrid. */
    class BackbagGrid implements IBackbagGrid {

        /**
         * Constructs a new BackbagGrid.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBackbagGrid);

        /** BackbagGrid properties. */
        public properties: string;

        /** BackbagGrid ts. */
        public ts: (number|Long);

        /** BackbagGrid memo. */
        public memo: string;

        /**
         * Creates a new BackbagGrid instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BackbagGrid instance
         */
        public static create(properties?: pb.IBackbagGrid): pb.BackbagGrid;

        /**
         * Encodes the specified BackbagGrid message. Does not implicitly {@link pb.BackbagGrid.verify|verify} messages.
         * @param message BackbagGrid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBackbagGrid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BackbagGrid message, length delimited. Does not implicitly {@link pb.BackbagGrid.verify|verify} messages.
         * @param message BackbagGrid message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBackbagGrid, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BackbagGrid message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BackbagGrid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.BackbagGrid;

        /**
         * Decodes a BackbagGrid message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BackbagGrid
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BackbagGrid;

        /**
         * Verifies a BackbagGrid message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BackbagGrid message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BackbagGrid
         */
        public static fromObject(object: { [k: string]: any }): pb.BackbagGrid;

        /**
         * Creates a plain object from a BackbagGrid message. Also converts values to other types if specified.
         * @param message BackbagGrid
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.BackbagGrid, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BackbagGrid to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Backbag. */
    interface IBackbag {

        /** Backbag grids */
        grids?: (pb.IBackbagGrid[]|null);
    }

    /** Represents a Backbag. */
    class Backbag implements IBackbag {

        /**
         * Constructs a new Backbag.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBackbag);

        /** Backbag grids. */
        public grids: pb.IBackbagGrid[];

        /**
         * Creates a new Backbag instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Backbag instance
         */
        public static create(properties?: pb.IBackbag): pb.Backbag;

        /**
         * Encodes the specified Backbag message. Does not implicitly {@link pb.Backbag.verify|verify} messages.
         * @param message Backbag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBackbag, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Backbag message, length delimited. Does not implicitly {@link pb.Backbag.verify|verify} messages.
         * @param message Backbag message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBackbag, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Backbag message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Backbag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Backbag;

        /**
         * Decodes a Backbag message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Backbag
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Backbag;

        /**
         * Verifies a Backbag message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Backbag message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Backbag
         */
        public static fromObject(object: { [k: string]: any }): pb.Backbag;

        /**
         * Creates a plain object from a Backbag message. Also converts values to other types if specified.
         * @param message Backbag
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Backbag, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Backbag to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameCounter. */
    interface IGameCounter {

        /** GameCounter game */
        game?: (pb.GameType|null);

        /** GameCounter win */
        win?: (number|null);

        /** GameCounter lose */
        lose?: (number|null);
    }

    /** Represents a GameCounter. */
    class GameCounter implements IGameCounter {

        /**
         * Constructs a new GameCounter.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameCounter);

        /** GameCounter game. */
        public game: pb.GameType;

        /** GameCounter win. */
        public win: number;

        /** GameCounter lose. */
        public lose: number;

        /**
         * Creates a new GameCounter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameCounter instance
         */
        public static create(properties?: pb.IGameCounter): pb.GameCounter;

        /**
         * Encodes the specified GameCounter message. Does not implicitly {@link pb.GameCounter.verify|verify} messages.
         * @param message GameCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameCounter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameCounter message, length delimited. Does not implicitly {@link pb.GameCounter.verify|verify} messages.
         * @param message GameCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameCounter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameCounter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameCounter;

        /**
         * Decodes a GameCounter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameCounter;

        /**
         * Verifies a GameCounter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameCounter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameCounter
         */
        public static fromObject(object: { [k: string]: any }): pb.GameCounter;

        /**
         * Creates a plain object from a GameCounter message. Also converts values to other types if specified.
         * @param message GameCounter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameCounter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameCounter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameCounters. */
    interface IGameCounters {

        /** GameCounters items */
        items?: (pb.IGameCounter[]|null);
    }

    /** Represents a GameCounters. */
    class GameCounters implements IGameCounters {

        /**
         * Constructs a new GameCounters.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameCounters);

        /** GameCounters items. */
        public items: pb.IGameCounter[];

        /**
         * Creates a new GameCounters instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameCounters instance
         */
        public static create(properties?: pb.IGameCounters): pb.GameCounters;

        /**
         * Encodes the specified GameCounters message. Does not implicitly {@link pb.GameCounters.verify|verify} messages.
         * @param message GameCounters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameCounters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameCounters message, length delimited. Does not implicitly {@link pb.GameCounters.verify|verify} messages.
         * @param message GameCounters message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameCounters, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameCounters message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameCounters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameCounters;

        /**
         * Decodes a GameCounters message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameCounters
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameCounters;

        /**
         * Verifies a GameCounters message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameCounters message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameCounters
         */
        public static fromObject(object: { [k: string]: any }): pb.GameCounters;

        /**
         * Creates a plain object from a GameCounters message. Also converts values to other types if specified.
         * @param message GameCounters
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameCounters, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameCounters to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TodayGameTimes. */
    interface ITodayGameTimes {

        /** TodayGameTimes counter */
        counter?: (number[]|null);
    }

    /** Represents a TodayGameTimes. */
    class TodayGameTimes implements ITodayGameTimes {

        /**
         * Constructs a new TodayGameTimes.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ITodayGameTimes);

        /** TodayGameTimes counter. */
        public counter: number[];

        /**
         * Creates a new TodayGameTimes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TodayGameTimes instance
         */
        public static create(properties?: pb.ITodayGameTimes): pb.TodayGameTimes;

        /**
         * Encodes the specified TodayGameTimes message. Does not implicitly {@link pb.TodayGameTimes.verify|verify} messages.
         * @param message TodayGameTimes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ITodayGameTimes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TodayGameTimes message, length delimited. Does not implicitly {@link pb.TodayGameTimes.verify|verify} messages.
         * @param message TodayGameTimes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ITodayGameTimes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TodayGameTimes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TodayGameTimes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.TodayGameTimes;

        /**
         * Decodes a TodayGameTimes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TodayGameTimes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.TodayGameTimes;

        /**
         * Verifies a TodayGameTimes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TodayGameTimes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TodayGameTimes
         */
        public static fromObject(object: { [k: string]: any }): pb.TodayGameTimes;

        /**
         * Creates a plain object from a TodayGameTimes message. Also converts values to other types if specified.
         * @param message TodayGameTimes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.TodayGameTimes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TodayGameTimes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SmxlState. */
    interface ISmxlState {

        /** SmxlState resetTs */
        resetTs?: (number|Long|null);

        /** SmxlState resetCounter */
        resetCounter?: (number|null);

        /** SmxlState resetTsPremonth */
        resetTsPremonth?: (number|Long|null);

        /** SmxlState lastMonthReportTs */
        lastMonthReportTs?: (number|Long|null);

        /** SmxlState goldInit */
        goldInit?: (number|Long|null);

        /** SmxlState gold */
        gold?: (number|Long|null);

        /** SmxlState todayTs */
        todayTs?: (number|Long|null);

        /** SmxlState todayTimes */
        todayTimes?: (number|null);
    }

    /** Represents a SmxlState. */
    class SmxlState implements ISmxlState {

        /**
         * Constructs a new SmxlState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISmxlState);

        /** SmxlState resetTs. */
        public resetTs: (number|Long);

        /** SmxlState resetCounter. */
        public resetCounter: number;

        /** SmxlState resetTsPremonth. */
        public resetTsPremonth: (number|Long);

        /** SmxlState lastMonthReportTs. */
        public lastMonthReportTs: (number|Long);

        /** SmxlState goldInit. */
        public goldInit: (number|Long);

        /** SmxlState gold. */
        public gold: (number|Long);

        /** SmxlState todayTs. */
        public todayTs: (number|Long);

        /** SmxlState todayTimes. */
        public todayTimes: number;

        /**
         * Creates a new SmxlState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SmxlState instance
         */
        public static create(properties?: pb.ISmxlState): pb.SmxlState;

        /**
         * Encodes the specified SmxlState message. Does not implicitly {@link pb.SmxlState.verify|verify} messages.
         * @param message SmxlState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISmxlState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SmxlState message, length delimited. Does not implicitly {@link pb.SmxlState.verify|verify} messages.
         * @param message SmxlState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISmxlState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SmxlState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SmxlState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SmxlState;

        /**
         * Decodes a SmxlState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SmxlState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SmxlState;

        /**
         * Verifies a SmxlState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SmxlState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SmxlState
         */
        public static fromObject(object: { [k: string]: any }): pb.SmxlState;

        /**
         * Creates a plain object from a SmxlState message. Also converts values to other types if specified.
         * @param message SmxlState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SmxlState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SmxlState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgLogAward. */
    interface ICgLogAward {

        /** CgLogAward stage */
        stage?: (number|null);

        /** CgLogAward awarded */
        awarded?: (boolean|null);

        /** CgLogAward gotten */
        gotten?: (boolean|null);
    }

    /** Represents a CgLogAward. */
    class CgLogAward implements ICgLogAward {

        /**
         * Constructs a new CgLogAward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgLogAward);

        /** CgLogAward stage. */
        public stage: number;

        /** CgLogAward awarded. */
        public awarded: boolean;

        /** CgLogAward gotten. */
        public gotten: boolean;

        /**
         * Creates a new CgLogAward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgLogAward instance
         */
        public static create(properties?: pb.ICgLogAward): pb.CgLogAward;

        /**
         * Encodes the specified CgLogAward message. Does not implicitly {@link pb.CgLogAward.verify|verify} messages.
         * @param message CgLogAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgLogAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgLogAward message, length delimited. Does not implicitly {@link pb.CgLogAward.verify|verify} messages.
         * @param message CgLogAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgLogAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgLogAward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgLogAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgLogAward;

        /**
         * Decodes a CgLogAward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgLogAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgLogAward;

        /**
         * Verifies a CgLogAward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgLogAward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgLogAward
         */
        public static fromObject(object: { [k: string]: any }): pb.CgLogAward;

        /**
         * Creates a plain object from a CgLogAward message. Also converts values to other types if specified.
         * @param message CgLogAward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgLogAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgLogAward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgState. */
    interface ICgState {

        /** CgState seasonId */
        seasonId?: (number|Long|null);

        /** CgState stage */
        stage?: (number|null);

        /** CgState progress */
        progress?: (number|null);

        /** CgState lifes */
        lifes?: (number|null);

        /** CgState win */
        win?: (number|null);

        /** CgState lose */
        lose?: (number|null);

        /** CgState clearance */
        clearance?: (boolean|null);

        /** CgState awards */
        awards?: (pb.ICgLogAward[]|null);
    }

    /** Represents a CgState. */
    class CgState implements ICgState {

        /**
         * Constructs a new CgState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgState);

        /** CgState seasonId. */
        public seasonId: (number|Long);

        /** CgState stage. */
        public stage: number;

        /** CgState progress. */
        public progress: number;

        /** CgState lifes. */
        public lifes: number;

        /** CgState win. */
        public win: number;

        /** CgState lose. */
        public lose: number;

        /** CgState clearance. */
        public clearance: boolean;

        /** CgState awards. */
        public awards: pb.ICgLogAward[];

        /**
         * Creates a new CgState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgState instance
         */
        public static create(properties?: pb.ICgState): pb.CgState;

        /**
         * Encodes the specified CgState message. Does not implicitly {@link pb.CgState.verify|verify} messages.
         * @param message CgState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgState message, length delimited. Does not implicitly {@link pb.CgState.verify|verify} messages.
         * @param message CgState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgState;

        /**
         * Decodes a CgState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgState;

        /**
         * Verifies a CgState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgState
         */
        public static fromObject(object: { [k: string]: any }): pb.CgState;

        /**
         * Creates a plain object from a CgState message. Also converts values to other types if specified.
         * @param message CgState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a MncgState. */
    interface IMncgState {

        /** MncgState account */
        account?: (number|null);

        /** MncgState orderList */
        orderList?: (pb.IStockOrderList|null);

        /** MncgState positionList */
        positionList?: (pb.IStockPositionList|null);

        /** MncgState stockList */
        stockList?: (number[]|null);
    }

    /** Represents a MncgState. */
    class MncgState implements IMncgState {

        /**
         * Constructs a new MncgState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMncgState);

        /** MncgState account. */
        public account: number;

        /** MncgState orderList. */
        public orderList?: (pb.IStockOrderList|null);

        /** MncgState positionList. */
        public positionList?: (pb.IStockPositionList|null);

        /** MncgState stockList. */
        public stockList: number[];

        /**
         * Creates a new MncgState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MncgState instance
         */
        public static create(properties?: pb.IMncgState): pb.MncgState;

        /**
         * Encodes the specified MncgState message. Does not implicitly {@link pb.MncgState.verify|verify} messages.
         * @param message MncgState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMncgState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MncgState message, length delimited. Does not implicitly {@link pb.MncgState.verify|verify} messages.
         * @param message MncgState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMncgState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MncgState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MncgState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.MncgState;

        /**
         * Decodes a MncgState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MncgState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MncgState;

        /**
         * Verifies a MncgState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MncgState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MncgState
         */
        public static fromObject(object: { [k: string]: any }): pb.MncgState;

        /**
         * Creates a plain object from a MncgState message. Also converts values to other types if specified.
         * @param message MncgState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.MncgState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MncgState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgdsStateItem. */
    interface ICgdsStateItem {

        /** CgdsStateItem id */
        id?: (number|null);

        /** CgdsStateItem state */
        state?: (pb.IMncgState|null);
    }

    /** Represents a CgdsStateItem. */
    class CgdsStateItem implements ICgdsStateItem {

        /**
         * Constructs a new CgdsStateItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgdsStateItem);

        /** CgdsStateItem id. */
        public id: number;

        /** CgdsStateItem state. */
        public state?: (pb.IMncgState|null);

        /**
         * Creates a new CgdsStateItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgdsStateItem instance
         */
        public static create(properties?: pb.ICgdsStateItem): pb.CgdsStateItem;

        /**
         * Encodes the specified CgdsStateItem message. Does not implicitly {@link pb.CgdsStateItem.verify|verify} messages.
         * @param message CgdsStateItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgdsStateItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgdsStateItem message, length delimited. Does not implicitly {@link pb.CgdsStateItem.verify|verify} messages.
         * @param message CgdsStateItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgdsStateItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgdsStateItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgdsStateItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgdsStateItem;

        /**
         * Decodes a CgdsStateItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgdsStateItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgdsStateItem;

        /**
         * Verifies a CgdsStateItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgdsStateItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgdsStateItem
         */
        public static fromObject(object: { [k: string]: any }): pb.CgdsStateItem;

        /**
         * Creates a plain object from a CgdsStateItem message. Also converts values to other types if specified.
         * @param message CgdsStateItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgdsStateItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgdsStateItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgdsState. */
    interface ICgdsState {

        /** CgdsState items */
        items?: (pb.ICgdsStateItem[]|null);
    }

    /** Represents a CgdsState. */
    class CgdsState implements ICgdsState {

        /**
         * Constructs a new CgdsState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgdsState);

        /** CgdsState items. */
        public items: pb.ICgdsStateItem[];

        /**
         * Creates a new CgdsState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgdsState instance
         */
        public static create(properties?: pb.ICgdsState): pb.CgdsState;

        /**
         * Encodes the specified CgdsState message. Does not implicitly {@link pb.CgdsState.verify|verify} messages.
         * @param message CgdsState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgdsState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgdsState message, length delimited. Does not implicitly {@link pb.CgdsState.verify|verify} messages.
         * @param message CgdsState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgdsState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgdsState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgdsState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgdsState;

        /**
         * Decodes a CgdsState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgdsState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgdsState;

        /**
         * Verifies a CgdsState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgdsState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgdsState
         */
        public static fromObject(object: { [k: string]: any }): pb.CgdsState;

        /**
         * Creates a plain object from a CgdsState message. Also converts values to other types if specified.
         * @param message CgdsState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgdsState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgdsState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgdsStockListItem. */
    interface ICgdsStockListItem {

        /** CgdsStockListItem id */
        id?: (number|null);

        /** CgdsStockListItem stockList */
        stockList?: (number[]|null);
    }

    /** Represents a CgdsStockListItem. */
    class CgdsStockListItem implements ICgdsStockListItem {

        /**
         * Constructs a new CgdsStockListItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgdsStockListItem);

        /** CgdsStockListItem id. */
        public id: number;

        /** CgdsStockListItem stockList. */
        public stockList: number[];

        /**
         * Creates a new CgdsStockListItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgdsStockListItem instance
         */
        public static create(properties?: pb.ICgdsStockListItem): pb.CgdsStockListItem;

        /**
         * Encodes the specified CgdsStockListItem message. Does not implicitly {@link pb.CgdsStockListItem.verify|verify} messages.
         * @param message CgdsStockListItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgdsStockListItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgdsStockListItem message, length delimited. Does not implicitly {@link pb.CgdsStockListItem.verify|verify} messages.
         * @param message CgdsStockListItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgdsStockListItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgdsStockListItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgdsStockListItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgdsStockListItem;

        /**
         * Decodes a CgdsStockListItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgdsStockListItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgdsStockListItem;

        /**
         * Verifies a CgdsStockListItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgdsStockListItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgdsStockListItem
         */
        public static fromObject(object: { [k: string]: any }): pb.CgdsStockListItem;

        /**
         * Creates a plain object from a CgdsStockListItem message. Also converts values to other types if specified.
         * @param message CgdsStockListItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgdsStockListItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgdsStockListItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZsjcState. */
    interface IZsjcState {

        /** ZsjcState items */
        items?: (pb.IZsjcGameData[]|null);
    }

    /** Represents a ZsjcState. */
    class ZsjcState implements IZsjcState {

        /**
         * Constructs a new ZsjcState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcState);

        /** ZsjcState items. */
        public items: pb.IZsjcGameData[];

        /**
         * Creates a new ZsjcState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcState instance
         */
        public static create(properties?: pb.IZsjcState): pb.ZsjcState;

        /**
         * Encodes the specified ZsjcState message. Does not implicitly {@link pb.ZsjcState.verify|verify} messages.
         * @param message ZsjcState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcState message, length delimited. Does not implicitly {@link pb.ZsjcState.verify|verify} messages.
         * @param message ZsjcState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcState;

        /**
         * Decodes a ZsjcState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcState;

        /**
         * Verifies a ZsjcState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcState
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcState;

        /**
         * Creates a plain object from a ZsjcState message. Also converts values to other types if specified.
         * @param message ZsjcState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Tasks. */
    interface ITasks {

        /** Tasks study */
        study?: (pb.ITaskItem[]|null);

        /** Tasks daily */
        daily?: (pb.ITaskItem[]|null);
    }

    /** Represents a Tasks. */
    class Tasks implements ITasks {

        /**
         * Constructs a new Tasks.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ITasks);

        /** Tasks study. */
        public study: pb.ITaskItem[];

        /** Tasks daily. */
        public daily: pb.ITaskItem[];

        /**
         * Creates a new Tasks instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Tasks instance
         */
        public static create(properties?: pb.ITasks): pb.Tasks;

        /**
         * Encodes the specified Tasks message. Does not implicitly {@link pb.Tasks.verify|verify} messages.
         * @param message Tasks message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ITasks, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Tasks message, length delimited. Does not implicitly {@link pb.Tasks.verify|verify} messages.
         * @param message Tasks message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ITasks, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Tasks message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Tasks
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Tasks;

        /**
         * Decodes a Tasks message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Tasks
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Tasks;

        /**
         * Verifies a Tasks message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Tasks message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Tasks
         */
        public static fromObject(object: { [k: string]: any }): pb.Tasks;

        /**
         * Creates a plain object from a Tasks message. Also converts values to other types if specified.
         * @param message Tasks
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Tasks, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Tasks to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an InviterState. */
    interface IInviterState {

        /** InviterState Total */
        Total?: (number|null);

        /** InviterState Awarded */
        Awarded?: (number[]|null);
    }

    /** Represents an InviterState. */
    class InviterState implements IInviterState {

        /**
         * Constructs a new InviterState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IInviterState);

        /** InviterState Total. */
        public Total: number;

        /** InviterState Awarded. */
        public Awarded: number[];

        /**
         * Creates a new InviterState instance using the specified properties.
         * @param [properties] Properties to set
         * @returns InviterState instance
         */
        public static create(properties?: pb.IInviterState): pb.InviterState;

        /**
         * Encodes the specified InviterState message. Does not implicitly {@link pb.InviterState.verify|verify} messages.
         * @param message InviterState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IInviterState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified InviterState message, length delimited. Does not implicitly {@link pb.InviterState.verify|verify} messages.
         * @param message InviterState message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IInviterState, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an InviterState message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns InviterState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.InviterState;

        /**
         * Decodes an InviterState message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns InviterState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.InviterState;

        /**
         * Verifies an InviterState message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an InviterState message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns InviterState
         */
        public static fromObject(object: { [k: string]: any }): pb.InviterState;

        /**
         * Creates a plain object from an InviterState message. Also converts values to other types if specified.
         * @param message InviterState
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.InviterState, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this InviterState to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameData. */
    interface IGameData {

        /** GameData uid */
        uid?: (number|null);

        /** GameData nickname */
        nickname?: (string|null);

        /** GameData icon */
        icon?: (string|null);

        /** GameData properties */
        properties?: ((number|Long)[]|null);

        /** GameData counters */
        counters?: (pb.IGameCounter[]|null);

        /** GameData smlxState */
        smlxState?: (pb.ISmxlState|null);

        /** GameData cgState */
        cgState?: (pb.ICgState|null);

        /** GameData today */
        today?: (number|Long|null);

        /** GameData todayTimes */
        todayTimes?: (number[]|null);

        /** GameData stockList */
        stockList?: (number[]|null);

        /** GameData zsjcState */
        zsjcState?: (pb.IZsjcState|null);

        /** GameData location */
        location?: (string|null);

        /** GameData gender */
        gender?: (string|null);

        /** GameData favorList */
        favorList?: (number[]|null);

        /** GameData tasks */
        tasks?: (pb.ITasks|null);

        /** GameData week */
        week?: (number|null);

        /** GameData mobile */
        mobile?: (string|null);

        /** GameData aiStockList */
        aiStockList?: (number[]|null);

        /** GameData cgdsStockList */
        cgdsStockList?: (pb.ICgdsStockListItem[]|null);

        /** GameData todayAdtimes */
        todayAdtimes?: (number|null);

        /** GameData award7 */
        award7?: (number[]|null);

        /** GameData isEditedNick */
        isEditedNick?: (boolean|null);

        /** GameData isEditedIcon */
        isEditedIcon?: (boolean|null);

        /** GameData cgdsStockListLast */
        cgdsStockListLast?: (number[]|null);

        /** GameData inviterState */
        inviterState?: (pb.IInviterState|null);
    }

    /** Represents a GameData. */
    class GameData implements IGameData {

        /**
         * Constructs a new GameData.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameData);

        /** GameData uid. */
        public uid: number;

        /** GameData nickname. */
        public nickname: string;

        /** GameData icon. */
        public icon: string;

        /** GameData properties. */
        public properties: (number|Long)[];

        /** GameData counters. */
        public counters: pb.IGameCounter[];

        /** GameData smlxState. */
        public smlxState?: (pb.ISmxlState|null);

        /** GameData cgState. */
        public cgState?: (pb.ICgState|null);

        /** GameData today. */
        public today: (number|Long);

        /** GameData todayTimes. */
        public todayTimes: number[];

        /** GameData stockList. */
        public stockList: number[];

        /** GameData zsjcState. */
        public zsjcState?: (pb.IZsjcState|null);

        /** GameData location. */
        public location: string;

        /** GameData gender. */
        public gender: string;

        /** GameData favorList. */
        public favorList: number[];

        /** GameData tasks. */
        public tasks?: (pb.ITasks|null);

        /** GameData week. */
        public week: number;

        /** GameData mobile. */
        public mobile: string;

        /** GameData aiStockList. */
        public aiStockList: number[];

        /** GameData cgdsStockList. */
        public cgdsStockList: pb.ICgdsStockListItem[];

        /** GameData todayAdtimes. */
        public todayAdtimes: number;

        /** GameData award7. */
        public award7: number[];

        /** GameData isEditedNick. */
        public isEditedNick: boolean;

        /** GameData isEditedIcon. */
        public isEditedIcon: boolean;

        /** GameData cgdsStockListLast. */
        public cgdsStockListLast: number[];

        /** GameData inviterState. */
        public inviterState?: (pb.IInviterState|null);

        /**
         * Creates a new GameData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameData instance
         */
        public static create(properties?: pb.IGameData): pb.GameData;

        /**
         * Encodes the specified GameData message. Does not implicitly {@link pb.GameData.verify|verify} messages.
         * @param message GameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameData message, length delimited. Does not implicitly {@link pb.GameData.verify|verify} messages.
         * @param message GameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameData;

        /**
         * Decodes a GameData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameData;

        /**
         * Verifies a GameData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameData
         */
        public static fromObject(object: { [k: string]: any }): pb.GameData;

        /**
         * Creates a plain object from a GameData message. Also converts values to other types if specified.
         * @param message GameData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GamePropertyItem. */
    interface IGamePropertyItem {

        /** GamePropertyItem id */
        id?: (pb.GamePropertyId|null);

        /** GamePropertyItem oldValue */
        oldValue?: (number|Long|null);

        /** GamePropertyItem newValue */
        newValue?: (number|Long|null);
    }

    /** Represents a GamePropertyItem. */
    class GamePropertyItem implements IGamePropertyItem {

        /**
         * Constructs a new GamePropertyItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGamePropertyItem);

        /** GamePropertyItem id. */
        public id: pb.GamePropertyId;

        /** GamePropertyItem oldValue. */
        public oldValue: (number|Long);

        /** GamePropertyItem newValue. */
        public newValue: (number|Long);

        /**
         * Creates a new GamePropertyItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GamePropertyItem instance
         */
        public static create(properties?: pb.IGamePropertyItem): pb.GamePropertyItem;

        /**
         * Encodes the specified GamePropertyItem message. Does not implicitly {@link pb.GamePropertyItem.verify|verify} messages.
         * @param message GamePropertyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGamePropertyItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GamePropertyItem message, length delimited. Does not implicitly {@link pb.GamePropertyItem.verify|verify} messages.
         * @param message GamePropertyItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGamePropertyItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GamePropertyItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GamePropertyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GamePropertyItem;

        /**
         * Decodes a GamePropertyItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GamePropertyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GamePropertyItem;

        /**
         * Verifies a GamePropertyItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GamePropertyItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GamePropertyItem
         */
        public static fromObject(object: { [k: string]: any }): pb.GamePropertyItem;

        /**
         * Creates a plain object from a GamePropertyItem message. Also converts values to other types if specified.
         * @param message GamePropertyItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GamePropertyItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GamePropertyItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameProperties. */
    interface IGameProperties {

        /** GameProperties items */
        items?: (pb.IGamePropertyItem[]|null);
    }

    /** Represents a GameProperties. */
    class GameProperties implements IGameProperties {

        /**
         * Constructs a new GameProperties.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameProperties);

        /** GameProperties items. */
        public items: pb.IGamePropertyItem[];

        /**
         * Creates a new GameProperties instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameProperties instance
         */
        public static create(properties?: pb.IGameProperties): pb.GameProperties;

        /**
         * Encodes the specified GameProperties message. Does not implicitly {@link pb.GameProperties.verify|verify} messages.
         * @param message GameProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameProperties message, length delimited. Does not implicitly {@link pb.GameProperties.verify|verify} messages.
         * @param message GameProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameProperties message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameProperties;

        /**
         * Decodes a GameProperties message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameProperties;

        /**
         * Verifies a GameProperties message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameProperties message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameProperties
         */
        public static fromObject(object: { [k: string]: any }): pb.GameProperties;

        /**
         * Creates a plain object from a GameProperties message. Also converts values to other types if specified.
         * @param message GameProperties
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameProperties to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameOperationItem. */
    interface IGameOperationItem {

        /** GameOperationItem opId */
        opId?: (pb.GameOperationId|null);

        /** GameOperationItem code */
        code?: (number|null);

        /** GameOperationItem kType */
        kType?: (pb.KType|null);

        /** GameOperationItem kTs */
        kTs?: (number|Long|null);

        /** GameOperationItem kOffset */
        kOffset?: (number|null);

        /** GameOperationItem price */
        price?: (number|null);

        /** GameOperationItem volume */
        volume?: (number|Long|null);

        /** GameOperationItem opTs */
        opTs?: (number|Long|null);

        /** GameOperationItem volFraction */
        volFraction?: (number|null);
    }

    /** Represents a GameOperationItem. */
    class GameOperationItem implements IGameOperationItem {

        /**
         * Constructs a new GameOperationItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameOperationItem);

        /** GameOperationItem opId. */
        public opId: pb.GameOperationId;

        /** GameOperationItem code. */
        public code: number;

        /** GameOperationItem kType. */
        public kType: pb.KType;

        /** GameOperationItem kTs. */
        public kTs: (number|Long);

        /** GameOperationItem kOffset. */
        public kOffset: number;

        /** GameOperationItem price. */
        public price: number;

        /** GameOperationItem volume. */
        public volume: (number|Long);

        /** GameOperationItem opTs. */
        public opTs: (number|Long);

        /** GameOperationItem volFraction. */
        public volFraction: number;

        /**
         * Creates a new GameOperationItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameOperationItem instance
         */
        public static create(properties?: pb.IGameOperationItem): pb.GameOperationItem;

        /**
         * Encodes the specified GameOperationItem message. Does not implicitly {@link pb.GameOperationItem.verify|verify} messages.
         * @param message GameOperationItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameOperationItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameOperationItem message, length delimited. Does not implicitly {@link pb.GameOperationItem.verify|verify} messages.
         * @param message GameOperationItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameOperationItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameOperationItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameOperationItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameOperationItem;

        /**
         * Decodes a GameOperationItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameOperationItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameOperationItem;

        /**
         * Verifies a GameOperationItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameOperationItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameOperationItem
         */
        public static fromObject(object: { [k: string]: any }): pb.GameOperationItem;

        /**
         * Creates a plain object from a GameOperationItem message. Also converts values to other types if specified.
         * @param message GameOperationItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameOperationItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameOperationItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameOperations. */
    interface IGameOperations {

        /** GameOperations items */
        items?: (pb.IGameOperationItem[]|null);

        /** GameOperations junXian */
        junXian?: (number[]|null);
    }

    /** Represents a GameOperations. */
    class GameOperations implements IGameOperations {

        /**
         * Constructs a new GameOperations.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameOperations);

        /** GameOperations items. */
        public items: pb.IGameOperationItem[];

        /** GameOperations junXian. */
        public junXian: number[];

        /**
         * Creates a new GameOperations instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameOperations instance
         */
        public static create(properties?: pb.IGameOperations): pb.GameOperations;

        /**
         * Encodes the specified GameOperations message. Does not implicitly {@link pb.GameOperations.verify|verify} messages.
         * @param message GameOperations message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameOperations, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameOperations message, length delimited. Does not implicitly {@link pb.GameOperations.verify|verify} messages.
         * @param message GameOperations message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameOperations, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameOperations message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameOperations;

        /**
         * Decodes a GameOperations message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameOperations;

        /**
         * Verifies a GameOperations message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameOperations message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameOperations
         */
        public static fromObject(object: { [k: string]: any }): pb.GameOperations;

        /**
         * Creates a plain object from a GameOperations message. Also converts values to other types if specified.
         * @param message GameOperations
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameOperations, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameOperations to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a GameResult. */
    interface IGameResult {

        /** GameResult uid */
        uid?: (number|null);

        /** GameResult gType */
        gType?: (pb.GameType|null);

        /** GameResult quotesCode */
        quotesCode?: (number|null);

        /** GameResult kType */
        kType?: (pb.KType|null);

        /** GameResult kFrom */
        kFrom?: (number|Long|null);

        /** GameResult kTo */
        kTo?: (number|Long|null);

        /** GameResult stockProfitRate */
        stockProfitRate?: (number|null);

        /** GameResult userProfitRate */
        userProfitRate?: (number|null);

        /** GameResult userCapital */
        userCapital?: (number|Long|null);

        /** GameResult userProfit */
        userProfit?: (number|Long|null);

        /** GameResult ts */
        ts?: (number|Long|null);

        /** GameResult rank */
        rank?: (number|null);

        /** GameResult refId */
        refId?: (number|Long|null);

        /** GameResult kStartup */
        kStartup?: (number|Long|null);

        /** GameResult kStop */
        kStop?: (number|Long|null);
    }

    /** Represents a GameResult. */
    class GameResult implements IGameResult {

        /**
         * Constructs a new GameResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameResult);

        /** GameResult uid. */
        public uid: number;

        /** GameResult gType. */
        public gType: pb.GameType;

        /** GameResult quotesCode. */
        public quotesCode: number;

        /** GameResult kType. */
        public kType: pb.KType;

        /** GameResult kFrom. */
        public kFrom: (number|Long);

        /** GameResult kTo. */
        public kTo: (number|Long);

        /** GameResult stockProfitRate. */
        public stockProfitRate: number;

        /** GameResult userProfitRate. */
        public userProfitRate: number;

        /** GameResult userCapital. */
        public userCapital: (number|Long);

        /** GameResult userProfit. */
        public userProfit: (number|Long);

        /** GameResult ts. */
        public ts: (number|Long);

        /** GameResult rank. */
        public rank: number;

        /** GameResult refId. */
        public refId: (number|Long);

        /** GameResult kStartup. */
        public kStartup: (number|Long);

        /** GameResult kStop. */
        public kStop: (number|Long);

        /**
         * Creates a new GameResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameResult instance
         */
        public static create(properties?: pb.IGameResult): pb.GameResult;

        /**
         * Encodes the specified GameResult message. Does not implicitly {@link pb.GameResult.verify|verify} messages.
         * @param message GameResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameResult message, length delimited. Does not implicitly {@link pb.GameResult.verify|verify} messages.
         * @param message GameResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameResult;

        /**
         * Decodes a GameResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameResult;

        /**
         * Verifies a GameResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameResult
         */
        public static fromObject(object: { [k: string]: any }): pb.GameResult;

        /**
         * Creates a plain object from a GameResult message. Also converts values to other types if specified.
         * @param message GameResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGameLogin. */
    interface ICmdGameLogin {

        /** CmdGameLogin uid */
        uid?: (number|null);

        /** CmdGameLogin token */
        token?: (string|null);
    }

    /** Represents a CmdGameLogin. */
    class CmdGameLogin implements ICmdGameLogin {

        /**
         * Constructs a new CmdGameLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGameLogin);

        /** CmdGameLogin uid. */
        public uid: number;

        /** CmdGameLogin token. */
        public token: string;

        /**
         * Creates a new CmdGameLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGameLogin instance
         */
        public static create(properties?: pb.ICmdGameLogin): pb.CmdGameLogin;

        /**
         * Encodes the specified CmdGameLogin message. Does not implicitly {@link pb.CmdGameLogin.verify|verify} messages.
         * @param message CmdGameLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGameLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGameLogin message, length delimited. Does not implicitly {@link pb.CmdGameLogin.verify|verify} messages.
         * @param message CmdGameLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGameLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGameLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGameLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGameLogin;

        /**
         * Decodes a CmdGameLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGameLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGameLogin;

        /**
         * Verifies a CmdGameLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGameLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGameLogin
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGameLogin;

        /**
         * Creates a plain object from a CmdGameLogin message. Also converts values to other types if specified.
         * @param message CmdGameLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGameLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGameLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGameLoginReply. */
    interface ICmdGameLoginReply {

        /** CmdGameLoginReply result */
        result?: (pb.IErrorInfo|null);

        /** CmdGameLoginReply data */
        data?: (pb.IGameData|null);
    }

    /** Represents a CmdGameLoginReply. */
    class CmdGameLoginReply implements ICmdGameLoginReply {

        /**
         * Constructs a new CmdGameLoginReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGameLoginReply);

        /** CmdGameLoginReply result. */
        public result?: (pb.IErrorInfo|null);

        /** CmdGameLoginReply data. */
        public data?: (pb.IGameData|null);

        /**
         * Creates a new CmdGameLoginReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGameLoginReply instance
         */
        public static create(properties?: pb.ICmdGameLoginReply): pb.CmdGameLoginReply;

        /**
         * Encodes the specified CmdGameLoginReply message. Does not implicitly {@link pb.CmdGameLoginReply.verify|verify} messages.
         * @param message CmdGameLoginReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGameLoginReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGameLoginReply message, length delimited. Does not implicitly {@link pb.CmdGameLoginReply.verify|verify} messages.
         * @param message CmdGameLoginReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGameLoginReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGameLoginReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGameLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGameLoginReply;

        /**
         * Decodes a CmdGameLoginReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGameLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGameLoginReply;

        /**
         * Verifies a CmdGameLoginReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGameLoginReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGameLoginReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGameLoginReply;

        /**
         * Creates a plain object from a CmdGameLoginReply message. Also converts values to other types if specified.
         * @param message CmdGameLoginReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGameLoginReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGameLoginReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUploadIcon. */
    interface ICmdUploadIcon {

        /** CmdUploadIcon uid */
        uid?: (number|null);

        /** CmdUploadIcon icon */
        icon?: (Uint8Array|null);
    }

    /** Represents a CmdUploadIcon. */
    class CmdUploadIcon implements ICmdUploadIcon {

        /**
         * Constructs a new CmdUploadIcon.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUploadIcon);

        /** CmdUploadIcon uid. */
        public uid: number;

        /** CmdUploadIcon icon. */
        public icon: Uint8Array;

        /**
         * Creates a new CmdUploadIcon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUploadIcon instance
         */
        public static create(properties?: pb.ICmdUploadIcon): pb.CmdUploadIcon;

        /**
         * Encodes the specified CmdUploadIcon message. Does not implicitly {@link pb.CmdUploadIcon.verify|verify} messages.
         * @param message CmdUploadIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUploadIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUploadIcon message, length delimited. Does not implicitly {@link pb.CmdUploadIcon.verify|verify} messages.
         * @param message CmdUploadIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUploadIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUploadIcon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUploadIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUploadIcon;

        /**
         * Decodes a CmdUploadIcon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUploadIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUploadIcon;

        /**
         * Verifies a CmdUploadIcon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUploadIcon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUploadIcon
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUploadIcon;

        /**
         * Creates a plain object from a CmdUploadIcon message. Also converts values to other types if specified.
         * @param message CmdUploadIcon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUploadIcon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUploadIcon to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerInfo. */
    interface IPlayerInfo {

        /** PlayerInfo uid */
        uid?: (number|null);

        /** PlayerInfo nick */
        nick?: (string|null);

        /** PlayerInfo icon */
        icon?: (string|null);

        /** PlayerInfo gender */
        gender?: (string|null);

        /** PlayerInfo location */
        location?: (string|null);

        /** PlayerInfo properties */
        properties?: ((number|Long)[]|null);

        /** PlayerInfo counters */
        counters?: (pb.IGameCounter[]|null);
    }

    /** Represents a PlayerInfo. */
    class PlayerInfo implements IPlayerInfo {

        /**
         * Constructs a new PlayerInfo.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPlayerInfo);

        /** PlayerInfo uid. */
        public uid: number;

        /** PlayerInfo nick. */
        public nick: string;

        /** PlayerInfo icon. */
        public icon: string;

        /** PlayerInfo gender. */
        public gender: string;

        /** PlayerInfo location. */
        public location: string;

        /** PlayerInfo properties. */
        public properties: (number|Long)[];

        /** PlayerInfo counters. */
        public counters: pb.IGameCounter[];

        /**
         * Creates a new PlayerInfo instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerInfo instance
         */
        public static create(properties?: pb.IPlayerInfo): pb.PlayerInfo;

        /**
         * Encodes the specified PlayerInfo message. Does not implicitly {@link pb.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerInfo message, length delimited. Does not implicitly {@link pb.PlayerInfo.verify|verify} messages.
         * @param message PlayerInfo message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPlayerInfo, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.PlayerInfo;

        /**
         * Decodes a PlayerInfo message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PlayerInfo;

        /**
         * Verifies a PlayerInfo message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerInfo message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerInfo
         */
        public static fromObject(object: { [k: string]: any }): pb.PlayerInfo;

        /**
         * Creates a plain object from a PlayerInfo message. Also converts values to other types if specified.
         * @param message PlayerInfo
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.PlayerInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerInfo to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdEditFavorList. */
    interface ICmdEditFavorList {

        /** CmdEditFavorList removed */
        removed?: (boolean|null);

        /** CmdEditFavorList uid */
        uid?: (number|null);
    }

    /** Represents a CmdEditFavorList. */
    class CmdEditFavorList implements ICmdEditFavorList {

        /**
         * Constructs a new CmdEditFavorList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdEditFavorList);

        /** CmdEditFavorList removed. */
        public removed: boolean;

        /** CmdEditFavorList uid. */
        public uid: number;

        /**
         * Creates a new CmdEditFavorList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdEditFavorList instance
         */
        public static create(properties?: pb.ICmdEditFavorList): pb.CmdEditFavorList;

        /**
         * Encodes the specified CmdEditFavorList message. Does not implicitly {@link pb.CmdEditFavorList.verify|verify} messages.
         * @param message CmdEditFavorList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdEditFavorList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdEditFavorList message, length delimited. Does not implicitly {@link pb.CmdEditFavorList.verify|verify} messages.
         * @param message CmdEditFavorList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdEditFavorList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdEditFavorList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdEditFavorList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdEditFavorList;

        /**
         * Decodes a CmdEditFavorList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdEditFavorList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdEditFavorList;

        /**
         * Verifies a CmdEditFavorList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdEditFavorList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdEditFavorList
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdEditFavorList;

        /**
         * Creates a plain object from a CmdEditFavorList message. Also converts values to other types if specified.
         * @param message CmdEditFavorList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdEditFavorList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdEditFavorList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetItem. */
    interface ICmdGetItem {

        /** CmdGetItem ts */
        ts?: (number|Long|null);
    }

    /** Represents a CmdGetItem. */
    class CmdGetItem implements ICmdGetItem {

        /**
         * Constructs a new CmdGetItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetItem);

        /** CmdGetItem ts. */
        public ts: (number|Long);

        /**
         * Creates a new CmdGetItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetItem instance
         */
        public static create(properties?: pb.ICmdGetItem): pb.CmdGetItem;

        /**
         * Encodes the specified CmdGetItem message. Does not implicitly {@link pb.CmdGetItem.verify|verify} messages.
         * @param message CmdGetItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetItem message, length delimited. Does not implicitly {@link pb.CmdGetItem.verify|verify} messages.
         * @param message CmdGetItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetItem;

        /**
         * Decodes a CmdGetItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetItem;

        /**
         * Verifies a CmdGetItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetItem
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetItem;

        /**
         * Creates a plain object from a CmdGetItem message. Also converts values to other types if specified.
         * @param message CmdGetItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdResetGameCounter. */
    interface ICmdResetGameCounter {

        /** CmdResetGameCounter game */
        game?: (pb.GameType|null);
    }

    /** Represents a CmdResetGameCounter. */
    class CmdResetGameCounter implements ICmdResetGameCounter {

        /**
         * Constructs a new CmdResetGameCounter.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdResetGameCounter);

        /** CmdResetGameCounter game. */
        public game: pb.GameType;

        /**
         * Creates a new CmdResetGameCounter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdResetGameCounter instance
         */
        public static create(properties?: pb.ICmdResetGameCounter): pb.CmdResetGameCounter;

        /**
         * Encodes the specified CmdResetGameCounter message. Does not implicitly {@link pb.CmdResetGameCounter.verify|verify} messages.
         * @param message CmdResetGameCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdResetGameCounter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdResetGameCounter message, length delimited. Does not implicitly {@link pb.CmdResetGameCounter.verify|verify} messages.
         * @param message CmdResetGameCounter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdResetGameCounter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdResetGameCounter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdResetGameCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdResetGameCounter;

        /**
         * Decodes a CmdResetGameCounter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdResetGameCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdResetGameCounter;

        /**
         * Verifies a CmdResetGameCounter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdResetGameCounter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdResetGameCounter
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdResetGameCounter;

        /**
         * Creates a plain object from a CmdResetGameCounter message. Also converts values to other types if specified.
         * @param message CmdResetGameCounter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdResetGameCounter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdResetGameCounter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a TaskItem. */
    interface ITaskItem {

        /** TaskItem taskId */
        taskId?: (number|null);

        /** TaskItem progress */
        progress?: (number|null);

        /** TaskItem award */
        award?: (number|null);

        /** TaskItem got */
        got?: (number|null);
    }

    /** Represents a TaskItem. */
    class TaskItem implements ITaskItem {

        /**
         * Constructs a new TaskItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ITaskItem);

        /** TaskItem taskId. */
        public taskId: number;

        /** TaskItem progress. */
        public progress: number;

        /** TaskItem award. */
        public award: number;

        /** TaskItem got. */
        public got: number;

        /**
         * Creates a new TaskItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns TaskItem instance
         */
        public static create(properties?: pb.ITaskItem): pb.TaskItem;

        /**
         * Encodes the specified TaskItem message. Does not implicitly {@link pb.TaskItem.verify|verify} messages.
         * @param message TaskItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ITaskItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified TaskItem message, length delimited. Does not implicitly {@link pb.TaskItem.verify|verify} messages.
         * @param message TaskItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ITaskItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a TaskItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns TaskItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.TaskItem;

        /**
         * Decodes a TaskItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns TaskItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.TaskItem;

        /**
         * Verifies a TaskItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a TaskItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns TaskItem
         */
        public static fromObject(object: { [k: string]: any }): pb.TaskItem;

        /**
         * Creates a plain object from a TaskItem message. Also converts values to other types if specified.
         * @param message TaskItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.TaskItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this TaskItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdStudyProgress. */
    interface ICmdStudyProgress {

        /** CmdStudyProgress index */
        index?: (number|null);

        /** CmdStudyProgress progress */
        progress?: (number|null);

        /** CmdStudyProgress award */
        award?: (number|null);
    }

    /** Represents a CmdStudyProgress. */
    class CmdStudyProgress implements ICmdStudyProgress {

        /**
         * Constructs a new CmdStudyProgress.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdStudyProgress);

        /** CmdStudyProgress index. */
        public index: number;

        /** CmdStudyProgress progress. */
        public progress: number;

        /** CmdStudyProgress award. */
        public award: number;

        /**
         * Creates a new CmdStudyProgress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdStudyProgress instance
         */
        public static create(properties?: pb.ICmdStudyProgress): pb.CmdStudyProgress;

        /**
         * Encodes the specified CmdStudyProgress message. Does not implicitly {@link pb.CmdStudyProgress.verify|verify} messages.
         * @param message CmdStudyProgress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdStudyProgress, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdStudyProgress message, length delimited. Does not implicitly {@link pb.CmdStudyProgress.verify|verify} messages.
         * @param message CmdStudyProgress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdStudyProgress, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdStudyProgress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdStudyProgress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdStudyProgress;

        /**
         * Decodes a CmdStudyProgress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdStudyProgress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdStudyProgress;

        /**
         * Verifies a CmdStudyProgress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdStudyProgress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdStudyProgress
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdStudyProgress;

        /**
         * Creates a plain object from a CmdStudyProgress message. Also converts values to other types if specified.
         * @param message CmdStudyProgress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdStudyProgress, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdStudyProgress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetDailyAward. */
    interface ICmdGetDailyAward {

        /** CmdGetDailyAward index */
        index?: (number|null);

        /** CmdGetDailyAward adClicked */
        adClicked?: (boolean|null);
    }

    /** Represents a CmdGetDailyAward. */
    class CmdGetDailyAward implements ICmdGetDailyAward {

        /**
         * Constructs a new CmdGetDailyAward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetDailyAward);

        /** CmdGetDailyAward index. */
        public index: number;

        /** CmdGetDailyAward adClicked. */
        public adClicked: boolean;

        /**
         * Creates a new CmdGetDailyAward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetDailyAward instance
         */
        public static create(properties?: pb.ICmdGetDailyAward): pb.CmdGetDailyAward;

        /**
         * Encodes the specified CmdGetDailyAward message. Does not implicitly {@link pb.CmdGetDailyAward.verify|verify} messages.
         * @param message CmdGetDailyAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetDailyAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetDailyAward message, length delimited. Does not implicitly {@link pb.CmdGetDailyAward.verify|verify} messages.
         * @param message CmdGetDailyAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetDailyAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetDailyAward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetDailyAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetDailyAward;

        /**
         * Decodes a CmdGetDailyAward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetDailyAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetDailyAward;

        /**
         * Verifies a CmdGetDailyAward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetDailyAward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetDailyAward
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetDailyAward;

        /**
         * Creates a plain object from a CmdGetDailyAward message. Also converts values to other types if specified.
         * @param message CmdGetDailyAward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetDailyAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetDailyAward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdDailyTaskProgress. */
    interface ICmdDailyTaskProgress {

        /** CmdDailyTaskProgress uid */
        uid?: (number|null);

        /** CmdDailyTaskProgress taskId */
        taskId?: (number|null);
    }

    /** Represents a CmdDailyTaskProgress. */
    class CmdDailyTaskProgress implements ICmdDailyTaskProgress {

        /**
         * Constructs a new CmdDailyTaskProgress.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdDailyTaskProgress);

        /** CmdDailyTaskProgress uid. */
        public uid: number;

        /** CmdDailyTaskProgress taskId. */
        public taskId: number;

        /**
         * Creates a new CmdDailyTaskProgress instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdDailyTaskProgress instance
         */
        public static create(properties?: pb.ICmdDailyTaskProgress): pb.CmdDailyTaskProgress;

        /**
         * Encodes the specified CmdDailyTaskProgress message. Does not implicitly {@link pb.CmdDailyTaskProgress.verify|verify} messages.
         * @param message CmdDailyTaskProgress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdDailyTaskProgress, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdDailyTaskProgress message, length delimited. Does not implicitly {@link pb.CmdDailyTaskProgress.verify|verify} messages.
         * @param message CmdDailyTaskProgress message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdDailyTaskProgress, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdDailyTaskProgress message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdDailyTaskProgress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdDailyTaskProgress;

        /**
         * Decodes a CmdDailyTaskProgress message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdDailyTaskProgress
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdDailyTaskProgress;

        /**
         * Verifies a CmdDailyTaskProgress message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdDailyTaskProgress message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdDailyTaskProgress
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdDailyTaskProgress;

        /**
         * Creates a plain object from a CmdDailyTaskProgress message. Also converts values to other types if specified.
         * @param message CmdDailyTaskProgress
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdDailyTaskProgress, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdDailyTaskProgress to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetInviterAward. */
    interface ICmdGetInviterAward {

        /** CmdGetInviterAward propertyId */
        propertyId?: (number|null);

        /** CmdGetInviterAward count */
        count?: (number|null);
    }

    /** Represents a CmdGetInviterAward. */
    class CmdGetInviterAward implements ICmdGetInviterAward {

        /**
         * Constructs a new CmdGetInviterAward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetInviterAward);

        /** CmdGetInviterAward propertyId. */
        public propertyId: number;

        /** CmdGetInviterAward count. */
        public count: number;

        /**
         * Creates a new CmdGetInviterAward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetInviterAward instance
         */
        public static create(properties?: pb.ICmdGetInviterAward): pb.CmdGetInviterAward;

        /**
         * Encodes the specified CmdGetInviterAward message. Does not implicitly {@link pb.CmdGetInviterAward.verify|verify} messages.
         * @param message CmdGetInviterAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetInviterAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetInviterAward message, length delimited. Does not implicitly {@link pb.CmdGetInviterAward.verify|verify} messages.
         * @param message CmdGetInviterAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetInviterAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetInviterAward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetInviterAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetInviterAward;

        /**
         * Decodes a CmdGetInviterAward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetInviterAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetInviterAward;

        /**
         * Verifies a CmdGetInviterAward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetInviterAward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetInviterAward
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetInviterAward;

        /**
         * Creates a plain object from a CmdGetInviterAward message. Also converts values to other types if specified.
         * @param message CmdGetInviterAward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetInviterAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetInviterAward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGameStart. */
    interface ICmdGameStart {

        /** CmdGameStart game */
        game?: (pb.GameType|null);

        /** CmdGameStart isJunxian */
        isJunxian?: (boolean|null);
    }

    /** Represents a CmdGameStart. */
    class CmdGameStart implements ICmdGameStart {

        /**
         * Constructs a new CmdGameStart.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGameStart);

        /** CmdGameStart game. */
        public game: pb.GameType;

        /** CmdGameStart isJunxian. */
        public isJunxian: boolean;

        /**
         * Creates a new CmdGameStart instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGameStart instance
         */
        public static create(properties?: pb.ICmdGameStart): pb.CmdGameStart;

        /**
         * Encodes the specified CmdGameStart message. Does not implicitly {@link pb.CmdGameStart.verify|verify} messages.
         * @param message CmdGameStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGameStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGameStart message, length delimited. Does not implicitly {@link pb.CmdGameStart.verify|verify} messages.
         * @param message CmdGameStart message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGameStart, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGameStart message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGameStart;

        /**
         * Decodes a CmdGameStart message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGameStart;

        /**
         * Verifies a CmdGameStart message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGameStart message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGameStart
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGameStart;

        /**
         * Creates a plain object from a CmdGameStart message. Also converts values to other types if specified.
         * @param message CmdGameStart
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGameStart, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGameStart to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGameOver. */
    interface ICmdGameOver {

        /** CmdGameOver result */
        result?: (pb.IGameResult|null);

        /** CmdGameOver operations */
        operations?: (pb.IGameOperations|null);
    }

    /** Represents a CmdGameOver. */
    class CmdGameOver implements ICmdGameOver {

        /**
         * Constructs a new CmdGameOver.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGameOver);

        /** CmdGameOver result. */
        public result?: (pb.IGameResult|null);

        /** CmdGameOver operations. */
        public operations?: (pb.IGameOperations|null);

        /**
         * Creates a new CmdGameOver instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGameOver instance
         */
        public static create(properties?: pb.ICmdGameOver): pb.CmdGameOver;

        /**
         * Encodes the specified CmdGameOver message. Does not implicitly {@link pb.CmdGameOver.verify|verify} messages.
         * @param message CmdGameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGameOver, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGameOver message, length delimited. Does not implicitly {@link pb.CmdGameOver.verify|verify} messages.
         * @param message CmdGameOver message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGameOver, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGameOver message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGameOver;

        /**
         * Decodes a CmdGameOver message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGameOver;

        /**
         * Verifies a CmdGameOver message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGameOver message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGameOver
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGameOver;

        /**
         * Creates a plain object from a CmdGameOver message. Also converts values to other types if specified.
         * @param message CmdGameOver
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGameOver, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGameOver to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGameOverReply. */
    interface ICmdGameOverReply {

        /** CmdGameOverReply ts */
        ts?: (number|Long|null);
    }

    /** Represents a CmdGameOverReply. */
    class CmdGameOverReply implements ICmdGameOverReply {

        /**
         * Constructs a new CmdGameOverReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGameOverReply);

        /** CmdGameOverReply ts. */
        public ts: (number|Long);

        /**
         * Creates a new CmdGameOverReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGameOverReply instance
         */
        public static create(properties?: pb.ICmdGameOverReply): pb.CmdGameOverReply;

        /**
         * Encodes the specified CmdGameOverReply message. Does not implicitly {@link pb.CmdGameOverReply.verify|verify} messages.
         * @param message CmdGameOverReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGameOverReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGameOverReply message, length delimited. Does not implicitly {@link pb.CmdGameOverReply.verify|verify} messages.
         * @param message CmdGameOverReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGameOverReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGameOverReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGameOverReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGameOverReply;

        /**
         * Decodes a CmdGameOverReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGameOverReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGameOverReply;

        /**
         * Verifies a CmdGameOverReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGameOverReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGameOverReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGameOverReply;

        /**
         * Creates a plain object from a CmdGameOverReply message. Also converts values to other types if specified.
         * @param message CmdGameOverReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGameOverReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGameOverReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryGameResult. */
    interface ICmdQueryGameResult {

        /** CmdQueryGameResult uid */
        uid?: (number|null);

        /** CmdQueryGameResult gType */
        gType?: (pb.GameType|null);

        /** CmdQueryGameResult from */
        from?: (number|Long|null);

        /** CmdQueryGameResult to */
        to?: (number|Long|null);

        /** CmdQueryGameResult pageSize */
        pageSize?: (number|null);

        /** CmdQueryGameResult ts */
        ts?: (number|Long|null);
    }

    /** Represents a CmdQueryGameResult. */
    class CmdQueryGameResult implements ICmdQueryGameResult {

        /**
         * Constructs a new CmdQueryGameResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryGameResult);

        /** CmdQueryGameResult uid. */
        public uid: number;

        /** CmdQueryGameResult gType. */
        public gType: pb.GameType;

        /** CmdQueryGameResult from. */
        public from: (number|Long);

        /** CmdQueryGameResult to. */
        public to: (number|Long);

        /** CmdQueryGameResult pageSize. */
        public pageSize: number;

        /** CmdQueryGameResult ts. */
        public ts: (number|Long);

        /**
         * Creates a new CmdQueryGameResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryGameResult instance
         */
        public static create(properties?: pb.ICmdQueryGameResult): pb.CmdQueryGameResult;

        /**
         * Encodes the specified CmdQueryGameResult message. Does not implicitly {@link pb.CmdQueryGameResult.verify|verify} messages.
         * @param message CmdQueryGameResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryGameResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryGameResult message, length delimited. Does not implicitly {@link pb.CmdQueryGameResult.verify|verify} messages.
         * @param message CmdQueryGameResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryGameResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryGameResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryGameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryGameResult;

        /**
         * Decodes a CmdQueryGameResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryGameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryGameResult;

        /**
         * Verifies a CmdQueryGameResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryGameResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryGameResult
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryGameResult;

        /**
         * Creates a plain object from a CmdQueryGameResult message. Also converts values to other types if specified.
         * @param message CmdQueryGameResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryGameResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryGameResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryGameResultReply. */
    interface ICmdQueryGameResultReply {

        /** CmdQueryGameResultReply results */
        results?: (pb.IGameResult[]|null);
    }

    /** Represents a CmdQueryGameResultReply. */
    class CmdQueryGameResultReply implements ICmdQueryGameResultReply {

        /**
         * Constructs a new CmdQueryGameResultReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryGameResultReply);

        /** CmdQueryGameResultReply results. */
        public results: pb.IGameResult[];

        /**
         * Creates a new CmdQueryGameResultReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryGameResultReply instance
         */
        public static create(properties?: pb.ICmdQueryGameResultReply): pb.CmdQueryGameResultReply;

        /**
         * Encodes the specified CmdQueryGameResultReply message. Does not implicitly {@link pb.CmdQueryGameResultReply.verify|verify} messages.
         * @param message CmdQueryGameResultReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryGameResultReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryGameResultReply message, length delimited. Does not implicitly {@link pb.CmdQueryGameResultReply.verify|verify} messages.
         * @param message CmdQueryGameResultReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryGameResultReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryGameResultReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryGameResultReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryGameResultReply;

        /**
         * Decodes a CmdQueryGameResultReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryGameResultReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryGameResultReply;

        /**
         * Verifies a CmdQueryGameResultReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryGameResultReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryGameResultReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryGameResultReply;

        /**
         * Creates a plain object from a CmdQueryGameResultReply message. Also converts values to other types if specified.
         * @param message CmdQueryGameResultReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryGameResultReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryGameResultReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetGameOperations. */
    interface ICmdGetGameOperations {

        /** CmdGetGameOperations uid */
        uid?: (number|null);

        /** CmdGetGameOperations ts */
        ts?: (number|Long|null);
    }

    /** Represents a CmdGetGameOperations. */
    class CmdGetGameOperations implements ICmdGetGameOperations {

        /**
         * Constructs a new CmdGetGameOperations.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetGameOperations);

        /** CmdGetGameOperations uid. */
        public uid: number;

        /** CmdGetGameOperations ts. */
        public ts: (number|Long);

        /**
         * Creates a new CmdGetGameOperations instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetGameOperations instance
         */
        public static create(properties?: pb.ICmdGetGameOperations): pb.CmdGetGameOperations;

        /**
         * Encodes the specified CmdGetGameOperations message. Does not implicitly {@link pb.CmdGetGameOperations.verify|verify} messages.
         * @param message CmdGetGameOperations message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetGameOperations, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetGameOperations message, length delimited. Does not implicitly {@link pb.CmdGetGameOperations.verify|verify} messages.
         * @param message CmdGetGameOperations message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetGameOperations, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetGameOperations message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetGameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetGameOperations;

        /**
         * Decodes a CmdGetGameOperations message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetGameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetGameOperations;

        /**
         * Verifies a CmdGetGameOperations message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetGameOperations message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetGameOperations
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetGameOperations;

        /**
         * Creates a plain object from a CmdGetGameOperations message. Also converts values to other types if specified.
         * @param message CmdGetGameOperations
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetGameOperations, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetGameOperations to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUnlockGame. */
    interface ICmdUnlockGame {

        /** CmdUnlockGame gType */
        gType?: (pb.GameType|null);
    }

    /** Represents a CmdUnlockGame. */
    class CmdUnlockGame implements ICmdUnlockGame {

        /**
         * Constructs a new CmdUnlockGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUnlockGame);

        /** CmdUnlockGame gType. */
        public gType: pb.GameType;

        /**
         * Creates a new CmdUnlockGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUnlockGame instance
         */
        public static create(properties?: pb.ICmdUnlockGame): pb.CmdUnlockGame;

        /**
         * Encodes the specified CmdUnlockGame message. Does not implicitly {@link pb.CmdUnlockGame.verify|verify} messages.
         * @param message CmdUnlockGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUnlockGame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUnlockGame message, length delimited. Does not implicitly {@link pb.CmdUnlockGame.verify|verify} messages.
         * @param message CmdUnlockGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUnlockGame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUnlockGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUnlockGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUnlockGame;

        /**
         * Decodes a CmdUnlockGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUnlockGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUnlockGame;

        /**
         * Verifies a CmdUnlockGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUnlockGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUnlockGame
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUnlockGame;

        /**
         * Creates a plain object from a CmdUnlockGame message. Also converts values to other types if specified.
         * @param message CmdUnlockGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUnlockGame, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUnlockGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetSmxlReportReply. */
    interface ICmdGetSmxlReportReply {

        /** CmdGetSmxlReportReply capitalInit */
        capitalInit?: (number|Long|null);

        /** CmdGetSmxlReportReply capitalFinal */
        capitalFinal?: (number|Long|null);

        /** CmdGetSmxlReportReply profitRate */
        profitRate?: (number|null);

        /** CmdGetSmxlReportReply winCount */
        winCount?: (number|null);

        /** CmdGetSmxlReportReply winCode */
        winCode?: (number|null);

        /** CmdGetSmxlReportReply winRate */
        winRate?: (number|null);

        /** CmdGetSmxlReportReply loseCount */
        loseCount?: (number|null);

        /** CmdGetSmxlReportReply loseCode */
        loseCode?: (number|null);

        /** CmdGetSmxlReportReply loseRate */
        loseRate?: (number|null);

        /** CmdGetSmxlReportReply count */
        count?: (number|null);

        /** CmdGetSmxlReportReply rankCaptial */
        rankCaptial?: (number|null);

        /** CmdGetSmxlReportReply rankRate */
        rankRate?: (number|null);

        /** CmdGetSmxlReportReply ts */
        ts?: (number|null);
    }

    /** Represents a CmdGetSmxlReportReply. */
    class CmdGetSmxlReportReply implements ICmdGetSmxlReportReply {

        /**
         * Constructs a new CmdGetSmxlReportReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetSmxlReportReply);

        /** CmdGetSmxlReportReply capitalInit. */
        public capitalInit: (number|Long);

        /** CmdGetSmxlReportReply capitalFinal. */
        public capitalFinal: (number|Long);

        /** CmdGetSmxlReportReply profitRate. */
        public profitRate: number;

        /** CmdGetSmxlReportReply winCount. */
        public winCount: number;

        /** CmdGetSmxlReportReply winCode. */
        public winCode: number;

        /** CmdGetSmxlReportReply winRate. */
        public winRate: number;

        /** CmdGetSmxlReportReply loseCount. */
        public loseCount: number;

        /** CmdGetSmxlReportReply loseCode. */
        public loseCode: number;

        /** CmdGetSmxlReportReply loseRate. */
        public loseRate: number;

        /** CmdGetSmxlReportReply count. */
        public count: number;

        /** CmdGetSmxlReportReply rankCaptial. */
        public rankCaptial: number;

        /** CmdGetSmxlReportReply rankRate. */
        public rankRate: number;

        /** CmdGetSmxlReportReply ts. */
        public ts: number;

        /**
         * Creates a new CmdGetSmxlReportReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetSmxlReportReply instance
         */
        public static create(properties?: pb.ICmdGetSmxlReportReply): pb.CmdGetSmxlReportReply;

        /**
         * Encodes the specified CmdGetSmxlReportReply message. Does not implicitly {@link pb.CmdGetSmxlReportReply.verify|verify} messages.
         * @param message CmdGetSmxlReportReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetSmxlReportReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetSmxlReportReply message, length delimited. Does not implicitly {@link pb.CmdGetSmxlReportReply.verify|verify} messages.
         * @param message CmdGetSmxlReportReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetSmxlReportReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetSmxlReportReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetSmxlReportReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetSmxlReportReply;

        /**
         * Decodes a CmdGetSmxlReportReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetSmxlReportReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetSmxlReportReply;

        /**
         * Verifies a CmdGetSmxlReportReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetSmxlReportReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetSmxlReportReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetSmxlReportReply;

        /**
         * Creates a plain object from a CmdGetSmxlReportReply message. Also converts values to other types if specified.
         * @param message CmdGetSmxlReportReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetSmxlReportReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetSmxlReportReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRoomCreate. */
    interface ICmdRoomCreate {

        /** CmdRoomCreate game */
        game?: (pb.GameType|null);

        /** CmdRoomCreate uid */
        uid?: (number|null);

        /** CmdRoomCreate node */
        node?: (number|null);

        /** CmdRoomCreate capital */
        capital?: (number|null);

        /** CmdRoomCreate pwd */
        pwd?: (string|null);

        /** CmdRoomCreate junXian */
        junXian?: (number[]|null);
    }

    /** Represents a CmdRoomCreate. */
    class CmdRoomCreate implements ICmdRoomCreate {

        /**
         * Constructs a new CmdRoomCreate.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRoomCreate);

        /** CmdRoomCreate game. */
        public game: pb.GameType;

        /** CmdRoomCreate uid. */
        public uid: number;

        /** CmdRoomCreate node. */
        public node: number;

        /** CmdRoomCreate capital. */
        public capital: number;

        /** CmdRoomCreate pwd. */
        public pwd: string;

        /** CmdRoomCreate junXian. */
        public junXian: number[];

        /**
         * Creates a new CmdRoomCreate instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRoomCreate instance
         */
        public static create(properties?: pb.ICmdRoomCreate): pb.CmdRoomCreate;

        /**
         * Encodes the specified CmdRoomCreate message. Does not implicitly {@link pb.CmdRoomCreate.verify|verify} messages.
         * @param message CmdRoomCreate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRoomCreate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRoomCreate message, length delimited. Does not implicitly {@link pb.CmdRoomCreate.verify|verify} messages.
         * @param message CmdRoomCreate message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRoomCreate, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRoomCreate message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRoomCreate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRoomCreate;

        /**
         * Decodes a CmdRoomCreate message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRoomCreate
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRoomCreate;

        /**
         * Verifies a CmdRoomCreate message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRoomCreate message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRoomCreate
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRoomCreate;

        /**
         * Creates a plain object from a CmdRoomCreate message. Also converts values to other types if specified.
         * @param message CmdRoomCreate
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRoomCreate, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRoomCreate to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRoomCreateReply. */
    interface ICmdRoomCreateReply {

        /** CmdRoomCreateReply err */
        err?: (pb.IErrorInfo|null);

        /** CmdRoomCreateReply id */
        id?: (number|null);
    }

    /** Represents a CmdRoomCreateReply. */
    class CmdRoomCreateReply implements ICmdRoomCreateReply {

        /**
         * Constructs a new CmdRoomCreateReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRoomCreateReply);

        /** CmdRoomCreateReply err. */
        public err?: (pb.IErrorInfo|null);

        /** CmdRoomCreateReply id. */
        public id: number;

        /**
         * Creates a new CmdRoomCreateReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRoomCreateReply instance
         */
        public static create(properties?: pb.ICmdRoomCreateReply): pb.CmdRoomCreateReply;

        /**
         * Encodes the specified CmdRoomCreateReply message. Does not implicitly {@link pb.CmdRoomCreateReply.verify|verify} messages.
         * @param message CmdRoomCreateReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRoomCreateReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRoomCreateReply message, length delimited. Does not implicitly {@link pb.CmdRoomCreateReply.verify|verify} messages.
         * @param message CmdRoomCreateReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRoomCreateReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRoomCreateReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRoomCreateReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRoomCreateReply;

        /**
         * Decodes a CmdRoomCreateReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRoomCreateReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRoomCreateReply;

        /**
         * Verifies a CmdRoomCreateReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRoomCreateReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRoomCreateReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRoomCreateReply;

        /**
         * Creates a plain object from a CmdRoomCreateReply message. Also converts values to other types if specified.
         * @param message CmdRoomCreateReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRoomCreateReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRoomCreateReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRoomEnter. */
    interface ICmdRoomEnter {

        /** CmdRoomEnter id */
        id?: (number|null);

        /** CmdRoomEnter game */
        game?: (pb.GameType|null);

        /** CmdRoomEnter uid */
        uid?: (number|null);

        /** CmdRoomEnter node */
        node?: (number|null);

        /** CmdRoomEnter pwd */
        pwd?: (string|null);

        /** CmdRoomEnter junXian */
        junXian?: (number[]|null);
    }

    /** Represents a CmdRoomEnter. */
    class CmdRoomEnter implements ICmdRoomEnter {

        /**
         * Constructs a new CmdRoomEnter.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRoomEnter);

        /** CmdRoomEnter id. */
        public id: number;

        /** CmdRoomEnter game. */
        public game: pb.GameType;

        /** CmdRoomEnter uid. */
        public uid: number;

        /** CmdRoomEnter node. */
        public node: number;

        /** CmdRoomEnter pwd. */
        public pwd: string;

        /** CmdRoomEnter junXian. */
        public junXian: number[];

        /**
         * Creates a new CmdRoomEnter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRoomEnter instance
         */
        public static create(properties?: pb.ICmdRoomEnter): pb.CmdRoomEnter;

        /**
         * Encodes the specified CmdRoomEnter message. Does not implicitly {@link pb.CmdRoomEnter.verify|verify} messages.
         * @param message CmdRoomEnter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRoomEnter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRoomEnter message, length delimited. Does not implicitly {@link pb.CmdRoomEnter.verify|verify} messages.
         * @param message CmdRoomEnter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRoomEnter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRoomEnter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRoomEnter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRoomEnter;

        /**
         * Decodes a CmdRoomEnter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRoomEnter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRoomEnter;

        /**
         * Verifies a CmdRoomEnter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRoomEnter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRoomEnter
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRoomEnter;

        /**
         * Creates a plain object from a CmdRoomEnter message. Also converts values to other types if specified.
         * @param message CmdRoomEnter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRoomEnter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRoomEnter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRoomEnterReply. */
    interface ICmdRoomEnterReply {

        /** CmdRoomEnterReply err */
        err?: (pb.IErrorInfo|null);

        /** CmdRoomEnterReply id */
        id?: (number|null);

        /** CmdRoomEnterReply node */
        node?: (number|null);
    }

    /** Represents a CmdRoomEnterReply. */
    class CmdRoomEnterReply implements ICmdRoomEnterReply {

        /**
         * Constructs a new CmdRoomEnterReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRoomEnterReply);

        /** CmdRoomEnterReply err. */
        public err?: (pb.IErrorInfo|null);

        /** CmdRoomEnterReply id. */
        public id: number;

        /** CmdRoomEnterReply node. */
        public node: number;

        /**
         * Creates a new CmdRoomEnterReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRoomEnterReply instance
         */
        public static create(properties?: pb.ICmdRoomEnterReply): pb.CmdRoomEnterReply;

        /**
         * Encodes the specified CmdRoomEnterReply message. Does not implicitly {@link pb.CmdRoomEnterReply.verify|verify} messages.
         * @param message CmdRoomEnterReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRoomEnterReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRoomEnterReply message, length delimited. Does not implicitly {@link pb.CmdRoomEnterReply.verify|verify} messages.
         * @param message CmdRoomEnterReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRoomEnterReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRoomEnterReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRoomEnterReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRoomEnterReply;

        /**
         * Decodes a CmdRoomEnterReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRoomEnterReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRoomEnterReply;

        /**
         * Verifies a CmdRoomEnterReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRoomEnterReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRoomEnterReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRoomEnterReply;

        /**
         * Creates a plain object from a CmdRoomEnterReply message. Also converts values to other types if specified.
         * @param message CmdRoomEnterReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRoomEnterReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRoomEnterReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRoomLeave. */
    interface ICmdRoomLeave {

        /** CmdRoomLeave id */
        id?: (number|null);

        /** CmdRoomLeave uid */
        uid?: (number|null);
    }

    /** Represents a CmdRoomLeave. */
    class CmdRoomLeave implements ICmdRoomLeave {

        /**
         * Constructs a new CmdRoomLeave.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRoomLeave);

        /** CmdRoomLeave id. */
        public id: number;

        /** CmdRoomLeave uid. */
        public uid: number;

        /**
         * Creates a new CmdRoomLeave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRoomLeave instance
         */
        public static create(properties?: pb.ICmdRoomLeave): pb.CmdRoomLeave;

        /**
         * Encodes the specified CmdRoomLeave message. Does not implicitly {@link pb.CmdRoomLeave.verify|verify} messages.
         * @param message CmdRoomLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRoomLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRoomLeave message, length delimited. Does not implicitly {@link pb.CmdRoomLeave.verify|verify} messages.
         * @param message CmdRoomLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRoomLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRoomLeave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRoomLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRoomLeave;

        /**
         * Decodes a CmdRoomLeave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRoomLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRoomLeave;

        /**
         * Verifies a CmdRoomLeave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRoomLeave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRoomLeave
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRoomLeave;

        /**
         * Creates a plain object from a CmdRoomLeave message. Also converts values to other types if specified.
         * @param message CmdRoomLeave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRoomLeave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRoomLeave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRoomLeaveReply. */
    interface ICmdRoomLeaveReply {

        /** CmdRoomLeaveReply err */
        err?: (pb.IErrorInfo|null);
    }

    /** Represents a CmdRoomLeaveReply. */
    class CmdRoomLeaveReply implements ICmdRoomLeaveReply {

        /**
         * Constructs a new CmdRoomLeaveReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRoomLeaveReply);

        /** CmdRoomLeaveReply err. */
        public err?: (pb.IErrorInfo|null);

        /**
         * Creates a new CmdRoomLeaveReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRoomLeaveReply instance
         */
        public static create(properties?: pb.ICmdRoomLeaveReply): pb.CmdRoomLeaveReply;

        /**
         * Encodes the specified CmdRoomLeaveReply message. Does not implicitly {@link pb.CmdRoomLeaveReply.verify|verify} messages.
         * @param message CmdRoomLeaveReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRoomLeaveReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRoomLeaveReply message, length delimited. Does not implicitly {@link pb.CmdRoomLeaveReply.verify|verify} messages.
         * @param message CmdRoomLeaveReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRoomLeaveReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRoomLeaveReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRoomLeaveReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRoomLeaveReply;

        /**
         * Decodes a CmdRoomLeaveReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRoomLeaveReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRoomLeaveReply;

        /**
         * Verifies a CmdRoomLeaveReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRoomLeaveReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRoomLeaveReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRoomLeaveReply;

        /**
         * Creates a plain object from a CmdRoomLeaveReply message. Also converts values to other types if specified.
         * @param message CmdRoomLeaveReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRoomLeaveReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRoomLeaveReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SyncRoomEnter. */
    interface ISyncRoomEnter {

        /** SyncRoomEnter id */
        id?: (number|null);

        /** SyncRoomEnter game */
        game?: (pb.GameType|null);

        /** SyncRoomEnter player */
        player?: (pb.IGameData|null);
    }

    /** Represents a SyncRoomEnter. */
    class SyncRoomEnter implements ISyncRoomEnter {

        /**
         * Constructs a new SyncRoomEnter.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISyncRoomEnter);

        /** SyncRoomEnter id. */
        public id: number;

        /** SyncRoomEnter game. */
        public game: pb.GameType;

        /** SyncRoomEnter player. */
        public player?: (pb.IGameData|null);

        /**
         * Creates a new SyncRoomEnter instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncRoomEnter instance
         */
        public static create(properties?: pb.ISyncRoomEnter): pb.SyncRoomEnter;

        /**
         * Encodes the specified SyncRoomEnter message. Does not implicitly {@link pb.SyncRoomEnter.verify|verify} messages.
         * @param message SyncRoomEnter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISyncRoomEnter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncRoomEnter message, length delimited. Does not implicitly {@link pb.SyncRoomEnter.verify|verify} messages.
         * @param message SyncRoomEnter message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISyncRoomEnter, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncRoomEnter message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncRoomEnter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SyncRoomEnter;

        /**
         * Decodes a SyncRoomEnter message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncRoomEnter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SyncRoomEnter;

        /**
         * Verifies a SyncRoomEnter message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncRoomEnter message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncRoomEnter
         */
        public static fromObject(object: { [k: string]: any }): pb.SyncRoomEnter;

        /**
         * Creates a plain object from a SyncRoomEnter message. Also converts values to other types if specified.
         * @param message SyncRoomEnter
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SyncRoomEnter, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncRoomEnter to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SyncRoomLeave. */
    interface ISyncRoomLeave {

        /** SyncRoomLeave id */
        id?: (number|null);

        /** SyncRoomLeave game */
        game?: (pb.GameType|null);

        /** SyncRoomLeave uid */
        uid?: (number|null);
    }

    /** Represents a SyncRoomLeave. */
    class SyncRoomLeave implements ISyncRoomLeave {

        /**
         * Constructs a new SyncRoomLeave.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISyncRoomLeave);

        /** SyncRoomLeave id. */
        public id: number;

        /** SyncRoomLeave game. */
        public game: pb.GameType;

        /** SyncRoomLeave uid. */
        public uid: number;

        /**
         * Creates a new SyncRoomLeave instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncRoomLeave instance
         */
        public static create(properties?: pb.ISyncRoomLeave): pb.SyncRoomLeave;

        /**
         * Encodes the specified SyncRoomLeave message. Does not implicitly {@link pb.SyncRoomLeave.verify|verify} messages.
         * @param message SyncRoomLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISyncRoomLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncRoomLeave message, length delimited. Does not implicitly {@link pb.SyncRoomLeave.verify|verify} messages.
         * @param message SyncRoomLeave message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISyncRoomLeave, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncRoomLeave message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncRoomLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SyncRoomLeave;

        /**
         * Decodes a SyncRoomLeave message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncRoomLeave
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SyncRoomLeave;

        /**
         * Verifies a SyncRoomLeave message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncRoomLeave message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncRoomLeave
         */
        public static fromObject(object: { [k: string]: any }): pb.SyncRoomLeave;

        /**
         * Creates a plain object from a SyncRoomLeave message. Also converts values to other types if specified.
         * @param message SyncRoomLeave
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SyncRoomLeave, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncRoomLeave to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomPlayerStatus. */
    interface IRoomPlayerStatus {

        /** RoomPlayerStatus id */
        id?: (number|null);

        /** RoomPlayerStatus uid */
        uid?: (number|null);

        /** RoomPlayerStatus ready */
        ready?: (boolean|null);
    }

    /** Represents a RoomPlayerStatus. */
    class RoomPlayerStatus implements IRoomPlayerStatus {

        /**
         * Constructs a new RoomPlayerStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomPlayerStatus);

        /** RoomPlayerStatus id. */
        public id: number;

        /** RoomPlayerStatus uid. */
        public uid: number;

        /** RoomPlayerStatus ready. */
        public ready: boolean;

        /**
         * Creates a new RoomPlayerStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomPlayerStatus instance
         */
        public static create(properties?: pb.IRoomPlayerStatus): pb.RoomPlayerStatus;

        /**
         * Encodes the specified RoomPlayerStatus message. Does not implicitly {@link pb.RoomPlayerStatus.verify|verify} messages.
         * @param message RoomPlayerStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomPlayerStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomPlayerStatus message, length delimited. Does not implicitly {@link pb.RoomPlayerStatus.verify|verify} messages.
         * @param message RoomPlayerStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomPlayerStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomPlayerStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomPlayerStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomPlayerStatus;

        /**
         * Decodes a RoomPlayerStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomPlayerStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomPlayerStatus;

        /**
         * Verifies a RoomPlayerStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomPlayerStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomPlayerStatus
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomPlayerStatus;

        /**
         * Creates a plain object from a RoomPlayerStatus message. Also converts values to other types if specified.
         * @param message RoomPlayerStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomPlayerStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomPlayerStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomGameStatus. */
    interface IRoomGameStatus {

        /** RoomGameStatus id */
        id?: (number|null);

        /** RoomGameStatus status */
        status?: (number|null);
    }

    /** Represents a RoomGameStatus. */
    class RoomGameStatus implements IRoomGameStatus {

        /**
         * Constructs a new RoomGameStatus.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomGameStatus);

        /** RoomGameStatus id. */
        public id: number;

        /** RoomGameStatus status. */
        public status: number;

        /**
         * Creates a new RoomGameStatus instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomGameStatus instance
         */
        public static create(properties?: pb.IRoomGameStatus): pb.RoomGameStatus;

        /**
         * Encodes the specified RoomGameStatus message. Does not implicitly {@link pb.RoomGameStatus.verify|verify} messages.
         * @param message RoomGameStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomGameStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomGameStatus message, length delimited. Does not implicitly {@link pb.RoomGameStatus.verify|verify} messages.
         * @param message RoomGameStatus message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomGameStatus, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomGameStatus message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomGameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomGameStatus;

        /**
         * Decodes a RoomGameStatus message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomGameStatus
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomGameStatus;

        /**
         * Verifies a RoomGameStatus message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomGameStatus message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomGameStatus
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomGameStatus;

        /**
         * Creates a plain object from a RoomGameStatus message. Also converts values to other types if specified.
         * @param message RoomGameStatus
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomGameStatus, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomGameStatus to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomGameOp. */
    interface IRoomGameOp {

        /** RoomGameOp id */
        id?: (number|null);

        /** RoomGameOp uid */
        uid?: (number|null);

        /** RoomGameOp ops */
        ops?: (Uint8Array|null);
    }

    /** Represents a RoomGameOp. */
    class RoomGameOp implements IRoomGameOp {

        /**
         * Constructs a new RoomGameOp.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomGameOp);

        /** RoomGameOp id. */
        public id: number;

        /** RoomGameOp uid. */
        public uid: number;

        /** RoomGameOp ops. */
        public ops: Uint8Array;

        /**
         * Creates a new RoomGameOp instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomGameOp instance
         */
        public static create(properties?: pb.IRoomGameOp): pb.RoomGameOp;

        /**
         * Encodes the specified RoomGameOp message. Does not implicitly {@link pb.RoomGameOp.verify|verify} messages.
         * @param message RoomGameOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomGameOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomGameOp message, length delimited. Does not implicitly {@link pb.RoomGameOp.verify|verify} messages.
         * @param message RoomGameOp message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomGameOp, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomGameOp message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomGameOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomGameOp;

        /**
         * Decodes a RoomGameOp message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomGameOp
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomGameOp;

        /**
         * Verifies a RoomGameOp message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomGameOp message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomGameOp
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomGameOp;

        /**
         * Creates a plain object from a RoomGameOp message. Also converts values to other types if specified.
         * @param message RoomGameOp
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomGameOp, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomGameOp to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomGameResult. */
    interface IRoomGameResult {

        /** RoomGameResult id */
        id?: (number|null);

        /** RoomGameResult result */
        result?: (Uint8Array|null);
    }

    /** Represents a RoomGameResult. */
    class RoomGameResult implements IRoomGameResult {

        /**
         * Constructs a new RoomGameResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomGameResult);

        /** RoomGameResult id. */
        public id: number;

        /** RoomGameResult result. */
        public result: Uint8Array;

        /**
         * Creates a new RoomGameResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomGameResult instance
         */
        public static create(properties?: pb.IRoomGameResult): pb.RoomGameResult;

        /**
         * Encodes the specified RoomGameResult message. Does not implicitly {@link pb.RoomGameResult.verify|verify} messages.
         * @param message RoomGameResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomGameResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomGameResult message, length delimited. Does not implicitly {@link pb.RoomGameResult.verify|verify} messages.
         * @param message RoomGameResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomGameResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomGameResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomGameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomGameResult;

        /**
         * Decodes a RoomGameResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomGameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomGameResult;

        /**
         * Verifies a RoomGameResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomGameResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomGameResult
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomGameResult;

        /**
         * Creates a plain object from a RoomGameResult message. Also converts values to other types if specified.
         * @param message RoomGameResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomGameResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomGameResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomData. */
    interface IRoomData {

        /** RoomData id */
        id?: (number|null);

        /** RoomData game */
        game?: (pb.GameType|null);

        /** RoomData data */
        data?: (Uint8Array|null);

        /** RoomData auto */
        auto?: (number|null);

        /** RoomData creator */
        creator?: (number|null);
    }

    /** Represents a RoomData. */
    class RoomData implements IRoomData {

        /**
         * Constructs a new RoomData.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomData);

        /** RoomData id. */
        public id: number;

        /** RoomData game. */
        public game: pb.GameType;

        /** RoomData data. */
        public data: Uint8Array;

        /** RoomData auto. */
        public auto: number;

        /** RoomData creator. */
        public creator: number;

        /**
         * Creates a new RoomData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomData instance
         */
        public static create(properties?: pb.IRoomData): pb.RoomData;

        /**
         * Encodes the specified RoomData message. Does not implicitly {@link pb.RoomData.verify|verify} messages.
         * @param message RoomData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomData message, length delimited. Does not implicitly {@link pb.RoomData.verify|verify} messages.
         * @param message RoomData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomData;

        /**
         * Decodes a RoomData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomData;

        /**
         * Verifies a RoomData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomData
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomData;

        /**
         * Creates a plain object from a RoomData message. Also converts values to other types if specified.
         * @param message RoomData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomPlayer. */
    interface IRoomPlayer {

        /** RoomPlayer gd */
        gd?: (pb.IGameData|null);

        /** RoomPlayer ready */
        ready?: (boolean|null);

        /** RoomPlayer giveup */
        giveup?: (boolean|null);

        /** RoomPlayer ops */
        ops?: (pb.IGameOperations|null);

        /** RoomPlayer result */
        result?: (pb.IGameResult|null);

        /** RoomPlayer curPos */
        curPos?: (number|Long|null);

        /** RoomPlayer junXian */
        junXian?: (number[]|null);
    }

    /** Represents a RoomPlayer. */
    class RoomPlayer implements IRoomPlayer {

        /**
         * Constructs a new RoomPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomPlayer);

        /** RoomPlayer gd. */
        public gd?: (pb.IGameData|null);

        /** RoomPlayer ready. */
        public ready: boolean;

        /** RoomPlayer giveup. */
        public giveup: boolean;

        /** RoomPlayer ops. */
        public ops?: (pb.IGameOperations|null);

        /** RoomPlayer result. */
        public result?: (pb.IGameResult|null);

        /** RoomPlayer curPos. */
        public curPos: (number|Long);

        /** RoomPlayer junXian. */
        public junXian: number[];

        /**
         * Creates a new RoomPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomPlayer instance
         */
        public static create(properties?: pb.IRoomPlayer): pb.RoomPlayer;

        /**
         * Encodes the specified RoomPlayer message. Does not implicitly {@link pb.RoomPlayer.verify|verify} messages.
         * @param message RoomPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomPlayer message, length delimited. Does not implicitly {@link pb.RoomPlayer.verify|verify} messages.
         * @param message RoomPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomPlayer;

        /**
         * Decodes a RoomPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomPlayer;

        /**
         * Verifies a RoomPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomPlayer
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomPlayer;

        /**
         * Creates a plain object from a RoomPlayer message. Also converts values to other types if specified.
         * @param message RoomPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomGameData. */
    interface IRoomGameData {

        /** RoomGameData id */
        id?: (number|null);

        /** RoomGameData game */
        game?: (pb.GameType|null);

        /** RoomGameData status */
        status?: (number|null);

        /** RoomGameData capital */
        capital?: (number|null);

        /** RoomGameData code */
        code?: (number|null);

        /** RoomGameData ktype */
        ktype?: (pb.KType|null);

        /** RoomGameData tsQuoteFrom */
        tsQuoteFrom?: (number|Long|null);

        /** RoomGameData tsQuoteTo */
        tsQuoteTo?: (number|Long|null);

        /** RoomGameData tsQuoteStart */
        tsQuoteStart?: (number|Long|null);

        /** RoomGameData players */
        players?: (pb.IRoomPlayer[]|null);

        /** RoomGameData tsGameFrom */
        tsGameFrom?: (number|Long|null);

        /** RoomGameData tsGameCur */
        tsGameCur?: (number|Long|null);

        /** RoomGameData quotes */
        quotes?: (pb.IQuotes|null);

        /** RoomGameData quotesFuture */
        quotesFuture?: (pb.IQuotesFuture|null);
    }

    /** Represents a RoomGameData. */
    class RoomGameData implements IRoomGameData {

        /**
         * Constructs a new RoomGameData.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomGameData);

        /** RoomGameData id. */
        public id: number;

        /** RoomGameData game. */
        public game: pb.GameType;

        /** RoomGameData status. */
        public status: number;

        /** RoomGameData capital. */
        public capital: number;

        /** RoomGameData code. */
        public code: number;

        /** RoomGameData ktype. */
        public ktype: pb.KType;

        /** RoomGameData tsQuoteFrom. */
        public tsQuoteFrom: (number|Long);

        /** RoomGameData tsQuoteTo. */
        public tsQuoteTo: (number|Long);

        /** RoomGameData tsQuoteStart. */
        public tsQuoteStart: (number|Long);

        /** RoomGameData players. */
        public players: pb.IRoomPlayer[];

        /** RoomGameData tsGameFrom. */
        public tsGameFrom: (number|Long);

        /** RoomGameData tsGameCur. */
        public tsGameCur: (number|Long);

        /** RoomGameData quotes. */
        public quotes?: (pb.IQuotes|null);

        /** RoomGameData quotesFuture. */
        public quotesFuture?: (pb.IQuotesFuture|null);

        /**
         * Creates a new RoomGameData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomGameData instance
         */
        public static create(properties?: pb.IRoomGameData): pb.RoomGameData;

        /**
         * Encodes the specified RoomGameData message. Does not implicitly {@link pb.RoomGameData.verify|verify} messages.
         * @param message RoomGameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomGameData message, length delimited. Does not implicitly {@link pb.RoomGameData.verify|verify} messages.
         * @param message RoomGameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomGameData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomGameData;

        /**
         * Decodes a RoomGameData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomGameData;

        /**
         * Verifies a RoomGameData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomGameData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomGameData
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomGameData;

        /**
         * Creates a plain object from a RoomGameData message. Also converts values to other types if specified.
         * @param message RoomGameData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomGameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomGameData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Notice. */
    interface INotice {

        /** Notice sender */
        sender?: (number|null);

        /** Notice receiver */
        receiver?: (number|null);

        /** Notice type */
        type?: (pb.MessageType|null);

        /** Notice text */
        text?: (string|null);

        /** Notice ts */
        ts?: (number|Long|null);

        /** Notice node */
        node?: (number|null);
    }

    /** Represents a Notice. */
    class Notice implements INotice {

        /**
         * Constructs a new Notice.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.INotice);

        /** Notice sender. */
        public sender: number;

        /** Notice receiver. */
        public receiver: number;

        /** Notice type. */
        public type: pb.MessageType;

        /** Notice text. */
        public text: string;

        /** Notice ts. */
        public ts: (number|Long);

        /** Notice node. */
        public node: number;

        /**
         * Creates a new Notice instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Notice instance
         */
        public static create(properties?: pb.INotice): pb.Notice;

        /**
         * Encodes the specified Notice message. Does not implicitly {@link pb.Notice.verify|verify} messages.
         * @param message Notice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.INotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Notice message, length delimited. Does not implicitly {@link pb.Notice.verify|verify} messages.
         * @param message Notice message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.INotice, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Notice message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Notice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Notice;

        /**
         * Decodes a Notice message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Notice
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Notice;

        /**
         * Verifies a Notice message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Notice message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Notice
         */
        public static fromObject(object: { [k: string]: any }): pb.Notice;

        /**
         * Creates a plain object from a Notice message. Also converts values to other types if specified.
         * @param message Notice
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Notice, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Notice to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgsConf. */
    interface ICgsConf {

        /** CgsConf id */
        id?: (number|null);

        /** CgsConf from */
        from?: (number|Long|null);

        /** CgsConf to */
        to?: (number|Long|null);

        /** CgsConf conf */
        conf?: (string|null);

        /** CgsConf award */
        award?: (string|null);

        /** CgsConf status */
        status?: (number|null);

        /** CgsConf people */
        people?: (number[]|null);
    }

    /** Represents a CgsConf. */
    class CgsConf implements ICgsConf {

        /**
         * Constructs a new CgsConf.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgsConf);

        /** CgsConf id. */
        public id: number;

        /** CgsConf from. */
        public from: (number|Long);

        /** CgsConf to. */
        public to: (number|Long);

        /** CgsConf conf. */
        public conf: string;

        /** CgsConf award. */
        public award: string;

        /** CgsConf status. */
        public status: number;

        /** CgsConf people. */
        public people: number[];

        /**
         * Creates a new CgsConf instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgsConf instance
         */
        public static create(properties?: pb.ICgsConf): pb.CgsConf;

        /**
         * Encodes the specified CgsConf message. Does not implicitly {@link pb.CgsConf.verify|verify} messages.
         * @param message CgsConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgsConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgsConf message, length delimited. Does not implicitly {@link pb.CgsConf.verify|verify} messages.
         * @param message CgsConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgsConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgsConf message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgsConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgsConf;

        /**
         * Decodes a CgsConf message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgsConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgsConf;

        /**
         * Verifies a CgsConf message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgsConf message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgsConf
         */
        public static fromObject(object: { [k: string]: any }): pb.CgsConf;

        /**
         * Creates a plain object from a CgsConf message. Also converts values to other types if specified.
         * @param message CgsConf
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgsConf, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgsConf to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RankingItem. */
    interface IRankingItem {

        /** RankingItem uid */
        uid?: (number|null);

        /** RankingItem nickname */
        nickname?: (string|null);

        /** RankingItem icon */
        icon?: (string|null);

        /** RankingItem gender */
        gender?: (string|null);

        /** RankingItem location */
        location?: (string|null);

        /** RankingItem cgsClearance */
        cgsClearance?: (number|null);

        /** RankingItem cgsNetwin */
        cgsNetwin?: (number|null);

        /** RankingItem cgsProgress */
        cgsProgress?: (number|null);

        /** RankingItem cgdsAccount */
        cgdsAccount?: (number|null);

        /** RankingItem zsjcCount */
        zsjcCount?: (number|null);

        /** RankingItem level */
        level?: (number|null);

        /** RankingItem fame */
        fame?: (number|null);

        /** RankingItem cgdsCapital */
        cgdsCapital?: (number|null);

        /** RankingItem zsjcBettingItem */
        zsjcBettingItem?: (number|null);

        /** RankingItem zsjcBettingAmount */
        zsjcBettingAmount?: (number|null);

        /** RankingItem vipExpired */
        vipExpired?: (number|Long|null);
    }

    /** Represents a RankingItem. */
    class RankingItem implements IRankingItem {

        /**
         * Constructs a new RankingItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRankingItem);

        /** RankingItem uid. */
        public uid: number;

        /** RankingItem nickname. */
        public nickname: string;

        /** RankingItem icon. */
        public icon: string;

        /** RankingItem gender. */
        public gender: string;

        /** RankingItem location. */
        public location: string;

        /** RankingItem cgsClearance. */
        public cgsClearance: number;

        /** RankingItem cgsNetwin. */
        public cgsNetwin: number;

        /** RankingItem cgsProgress. */
        public cgsProgress: number;

        /** RankingItem cgdsAccount. */
        public cgdsAccount: number;

        /** RankingItem zsjcCount. */
        public zsjcCount: number;

        /** RankingItem level. */
        public level: number;

        /** RankingItem fame. */
        public fame: number;

        /** RankingItem cgdsCapital. */
        public cgdsCapital: number;

        /** RankingItem zsjcBettingItem. */
        public zsjcBettingItem: number;

        /** RankingItem zsjcBettingAmount. */
        public zsjcBettingAmount: number;

        /** RankingItem vipExpired. */
        public vipExpired: (number|Long);

        /**
         * Creates a new RankingItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RankingItem instance
         */
        public static create(properties?: pb.IRankingItem): pb.RankingItem;

        /**
         * Encodes the specified RankingItem message. Does not implicitly {@link pb.RankingItem.verify|verify} messages.
         * @param message RankingItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRankingItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RankingItem message, length delimited. Does not implicitly {@link pb.RankingItem.verify|verify} messages.
         * @param message RankingItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRankingItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RankingItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RankingItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RankingItem;

        /**
         * Decodes a RankingItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RankingItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RankingItem;

        /**
         * Verifies a RankingItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RankingItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RankingItem
         */
        public static fromObject(object: { [k: string]: any }): pb.RankingItem;

        /**
         * Creates a plain object from a RankingItem message. Also converts values to other types if specified.
         * @param message RankingItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RankingItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RankingItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RankingList. */
    interface IRankingList {

        /** RankingList id */
        id?: (number|null);

        /** RankingList Items */
        Items?: (pb.IRankingItem[]|null);
    }

    /** Represents a RankingList. */
    class RankingList implements IRankingList {

        /**
         * Constructs a new RankingList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRankingList);

        /** RankingList id. */
        public id: number;

        /** RankingList Items. */
        public Items: pb.IRankingItem[];

        /**
         * Creates a new RankingList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RankingList instance
         */
        public static create(properties?: pb.IRankingList): pb.RankingList;

        /**
         * Encodes the specified RankingList message. Does not implicitly {@link pb.RankingList.verify|verify} messages.
         * @param message RankingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRankingList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RankingList message, length delimited. Does not implicitly {@link pb.RankingList.verify|verify} messages.
         * @param message RankingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRankingList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RankingList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RankingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RankingList;

        /**
         * Decodes a RankingList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RankingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RankingList;

        /**
         * Verifies a RankingList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RankingList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RankingList
         */
        public static fromObject(object: { [k: string]: any }): pb.RankingList;

        /**
         * Creates a plain object from a RankingList message. Also converts values to other types if specified.
         * @param message RankingList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RankingList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RankingList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdCgsRanking. */
    interface ICmdCgsRanking {

        /** CmdCgsRanking id */
        id?: (number|null);

        /** CmdCgsRanking stage */
        stage?: (number|null);
    }

    /** Represents a CmdCgsRanking. */
    class CmdCgsRanking implements ICmdCgsRanking {

        /**
         * Constructs a new CmdCgsRanking.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdCgsRanking);

        /** CmdCgsRanking id. */
        public id: number;

        /** CmdCgsRanking stage. */
        public stage: number;

        /**
         * Creates a new CmdCgsRanking instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdCgsRanking instance
         */
        public static create(properties?: pb.ICmdCgsRanking): pb.CmdCgsRanking;

        /**
         * Encodes the specified CmdCgsRanking message. Does not implicitly {@link pb.CmdCgsRanking.verify|verify} messages.
         * @param message CmdCgsRanking message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdCgsRanking, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdCgsRanking message, length delimited. Does not implicitly {@link pb.CmdCgsRanking.verify|verify} messages.
         * @param message CmdCgsRanking message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdCgsRanking, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdCgsRanking message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdCgsRanking
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdCgsRanking;

        /**
         * Decodes a CmdCgsRanking message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdCgsRanking
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdCgsRanking;

        /**
         * Verifies a CmdCgsRanking message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdCgsRanking message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdCgsRanking
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdCgsRanking;

        /**
         * Creates a plain object from a CmdCgsRanking message. Also converts values to other types if specified.
         * @param message CmdCgsRanking
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdCgsRanking, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdCgsRanking to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JjPlayer. */
    interface IJjPlayer {

        /** JjPlayer gd */
        gd?: (pb.IGameData|null);

        /** JjPlayer ops */
        ops?: (pb.IGameOperations|null);

        /** JjPlayer result */
        result?: (pb.IGameResult|null);
    }

    /** Represents a JjPlayer. */
    class JjPlayer implements IJjPlayer {

        /**
         * Constructs a new JjPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IJjPlayer);

        /** JjPlayer gd. */
        public gd?: (pb.IGameData|null);

        /** JjPlayer ops. */
        public ops?: (pb.IGameOperations|null);

        /** JjPlayer result. */
        public result?: (pb.IGameResult|null);

        /**
         * Creates a new JjPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JjPlayer instance
         */
        public static create(properties?: pb.IJjPlayer): pb.JjPlayer;

        /**
         * Encodes the specified JjPlayer message. Does not implicitly {@link pb.JjPlayer.verify|verify} messages.
         * @param message JjPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IJjPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JjPlayer message, length delimited. Does not implicitly {@link pb.JjPlayer.verify|verify} messages.
         * @param message JjPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IJjPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JjPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JjPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.JjPlayer;

        /**
         * Decodes a JjPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JjPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JjPlayer;

        /**
         * Verifies a JjPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JjPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JjPlayer
         */
        public static fromObject(object: { [k: string]: any }): pb.JjPlayer;

        /**
         * Creates a plain object from a JjPlayer message. Also converts values to other types if specified.
         * @param message JjPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.JjPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JjPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a JjGame. */
    interface IJjGame {

        /** JjGame code */
        code?: (number|null);

        /** JjGame ktype */
        ktype?: (pb.KType|null);

        /** JjGame tsQuoteFrom */
        tsQuoteFrom?: (number|Long|null);

        /** JjGame tsQuoteTo */
        tsQuoteTo?: (number|Long|null);

        /** JjGame tsQuoteStart */
        tsQuoteStart?: (number|Long|null);

        /** JjGame quotes */
        quotes?: (pb.IQuotes|null);

        /** JjGame quotesFuture */
        quotesFuture?: (pb.IQuotesFuture|null);

        /** JjGame players */
        players?: (pb.IJjPlayer[]|null);

        /** JjGame capital */
        capital?: (number|null);
    }

    /** Represents a JjGame. */
    class JjGame implements IJjGame {

        /**
         * Constructs a new JjGame.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IJjGame);

        /** JjGame code. */
        public code: number;

        /** JjGame ktype. */
        public ktype: pb.KType;

        /** JjGame tsQuoteFrom. */
        public tsQuoteFrom: (number|Long);

        /** JjGame tsQuoteTo. */
        public tsQuoteTo: (number|Long);

        /** JjGame tsQuoteStart. */
        public tsQuoteStart: (number|Long);

        /** JjGame quotes. */
        public quotes?: (pb.IQuotes|null);

        /** JjGame quotesFuture. */
        public quotesFuture?: (pb.IQuotesFuture|null);

        /** JjGame players. */
        public players: pb.IJjPlayer[];

        /** JjGame capital. */
        public capital: number;

        /**
         * Creates a new JjGame instance using the specified properties.
         * @param [properties] Properties to set
         * @returns JjGame instance
         */
        public static create(properties?: pb.IJjGame): pb.JjGame;

        /**
         * Encodes the specified JjGame message. Does not implicitly {@link pb.JjGame.verify|verify} messages.
         * @param message JjGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IJjGame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified JjGame message, length delimited. Does not implicitly {@link pb.JjGame.verify|verify} messages.
         * @param message JjGame message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IJjGame, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a JjGame message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns JjGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.JjGame;

        /**
         * Decodes a JjGame message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns JjGame
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.JjGame;

        /**
         * Verifies a JjGame message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a JjGame message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns JjGame
         */
        public static fromObject(object: { [k: string]: any }): pb.JjGame;

        /**
         * Creates a plain object from a JjGame message. Also converts values to other types if specified.
         * @param message JjGame
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.JjGame, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this JjGame to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdCgsGetStageAward. */
    interface ICmdCgsGetStageAward {

        /** CmdCgsGetStageAward id */
        id?: (number|null);

        /** CmdCgsGetStageAward stage */
        stage?: (number|null);

        /** CmdCgsGetStageAward double */
        double?: (boolean|null);
    }

    /** Represents a CmdCgsGetStageAward. */
    class CmdCgsGetStageAward implements ICmdCgsGetStageAward {

        /**
         * Constructs a new CmdCgsGetStageAward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdCgsGetStageAward);

        /** CmdCgsGetStageAward id. */
        public id: number;

        /** CmdCgsGetStageAward stage. */
        public stage: number;

        /** CmdCgsGetStageAward double. */
        public double: boolean;

        /**
         * Creates a new CmdCgsGetStageAward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdCgsGetStageAward instance
         */
        public static create(properties?: pb.ICmdCgsGetStageAward): pb.CmdCgsGetStageAward;

        /**
         * Encodes the specified CmdCgsGetStageAward message. Does not implicitly {@link pb.CmdCgsGetStageAward.verify|verify} messages.
         * @param message CmdCgsGetStageAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdCgsGetStageAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdCgsGetStageAward message, length delimited. Does not implicitly {@link pb.CmdCgsGetStageAward.verify|verify} messages.
         * @param message CmdCgsGetStageAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdCgsGetStageAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdCgsGetStageAward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdCgsGetStageAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdCgsGetStageAward;

        /**
         * Decodes a CmdCgsGetStageAward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdCgsGetStageAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdCgsGetStageAward;

        /**
         * Verifies a CmdCgsGetStageAward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdCgsGetStageAward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdCgsGetStageAward
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdCgsGetStageAward;

        /**
         * Creates a plain object from a CmdCgsGetStageAward message. Also converts values to other types if specified.
         * @param message CmdCgsGetStageAward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdCgsGetStageAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdCgsGetStageAward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdStockOrder. */
    interface ICmdStockOrder {

        /** CmdStockOrder code */
        code?: (number|null);

        /** CmdStockOrder type */
        type?: (pb.OrderType|null);

        /** CmdStockOrder price */
        price?: (number|null);

        /** CmdStockOrder volume */
        volume?: (number|null);

        /** CmdStockOrder amount */
        amount?: (number|null);

        /** CmdStockOrder uid */
        uid?: (number|null);

        /** CmdStockOrder id */
        id?: (number|null);
    }

    /** Represents a CmdStockOrder. */
    class CmdStockOrder implements ICmdStockOrder {

        /**
         * Constructs a new CmdStockOrder.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdStockOrder);

        /** CmdStockOrder code. */
        public code: number;

        /** CmdStockOrder type. */
        public type: pb.OrderType;

        /** CmdStockOrder price. */
        public price: number;

        /** CmdStockOrder volume. */
        public volume: number;

        /** CmdStockOrder amount. */
        public amount: number;

        /** CmdStockOrder uid. */
        public uid: number;

        /** CmdStockOrder id. */
        public id: number;

        /**
         * Creates a new CmdStockOrder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdStockOrder instance
         */
        public static create(properties?: pb.ICmdStockOrder): pb.CmdStockOrder;

        /**
         * Encodes the specified CmdStockOrder message. Does not implicitly {@link pb.CmdStockOrder.verify|verify} messages.
         * @param message CmdStockOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdStockOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdStockOrder message, length delimited. Does not implicitly {@link pb.CmdStockOrder.verify|verify} messages.
         * @param message CmdStockOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdStockOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdStockOrder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdStockOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdStockOrder;

        /**
         * Decodes a CmdStockOrder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdStockOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdStockOrder;

        /**
         * Verifies a CmdStockOrder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdStockOrder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdStockOrder
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdStockOrder;

        /**
         * Creates a plain object from a CmdStockOrder message. Also converts values to other types if specified.
         * @param message CmdStockOrder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdStockOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdStockOrder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdStockOrderReply. */
    interface ICmdStockOrderReply {

        /** CmdStockOrderReply orderId */
        orderId?: (number|Long|null);

        /** CmdStockOrderReply node */
        node?: (number|null);

        /** CmdStockOrderReply result */
        result?: (pb.IErrorInfo|null);
    }

    /** Represents a CmdStockOrderReply. */
    class CmdStockOrderReply implements ICmdStockOrderReply {

        /**
         * Constructs a new CmdStockOrderReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdStockOrderReply);

        /** CmdStockOrderReply orderId. */
        public orderId: (number|Long);

        /** CmdStockOrderReply node. */
        public node: number;

        /** CmdStockOrderReply result. */
        public result?: (pb.IErrorInfo|null);

        /**
         * Creates a new CmdStockOrderReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdStockOrderReply instance
         */
        public static create(properties?: pb.ICmdStockOrderReply): pb.CmdStockOrderReply;

        /**
         * Encodes the specified CmdStockOrderReply message. Does not implicitly {@link pb.CmdStockOrderReply.verify|verify} messages.
         * @param message CmdStockOrderReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdStockOrderReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdStockOrderReply message, length delimited. Does not implicitly {@link pb.CmdStockOrderReply.verify|verify} messages.
         * @param message CmdStockOrderReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdStockOrderReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdStockOrderReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdStockOrderReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdStockOrderReply;

        /**
         * Decodes a CmdStockOrderReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdStockOrderReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdStockOrderReply;

        /**
         * Verifies a CmdStockOrderReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdStockOrderReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdStockOrderReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdStockOrderReply;

        /**
         * Creates a plain object from a CmdStockOrderReply message. Also converts values to other types if specified.
         * @param message CmdStockOrderReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdStockOrderReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdStockOrderReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdStockOrderCancel. */
    interface ICmdStockOrderCancel {

        /** CmdStockOrderCancel orderId */
        orderId?: (number|Long|null);

        /** CmdStockOrderCancel type */
        type?: (pb.OrderType|null);

        /** CmdStockOrderCancel code */
        code?: (number|null);

        /** CmdStockOrderCancel uid */
        uid?: (number|null);

        /** CmdStockOrderCancel id */
        id?: (number|null);

        /** CmdStockOrderCancel node */
        node?: (number|null);
    }

    /** Represents a CmdStockOrderCancel. */
    class CmdStockOrderCancel implements ICmdStockOrderCancel {

        /**
         * Constructs a new CmdStockOrderCancel.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdStockOrderCancel);

        /** CmdStockOrderCancel orderId. */
        public orderId: (number|Long);

        /** CmdStockOrderCancel type. */
        public type: pb.OrderType;

        /** CmdStockOrderCancel code. */
        public code: number;

        /** CmdStockOrderCancel uid. */
        public uid: number;

        /** CmdStockOrderCancel id. */
        public id: number;

        /** CmdStockOrderCancel node. */
        public node: number;

        /**
         * Creates a new CmdStockOrderCancel instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdStockOrderCancel instance
         */
        public static create(properties?: pb.ICmdStockOrderCancel): pb.CmdStockOrderCancel;

        /**
         * Encodes the specified CmdStockOrderCancel message. Does not implicitly {@link pb.CmdStockOrderCancel.verify|verify} messages.
         * @param message CmdStockOrderCancel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdStockOrderCancel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdStockOrderCancel message, length delimited. Does not implicitly {@link pb.CmdStockOrderCancel.verify|verify} messages.
         * @param message CmdStockOrderCancel message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdStockOrderCancel, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdStockOrderCancel message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdStockOrderCancel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdStockOrderCancel;

        /**
         * Decodes a CmdStockOrderCancel message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdStockOrderCancel
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdStockOrderCancel;

        /**
         * Verifies a CmdStockOrderCancel message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdStockOrderCancel message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdStockOrderCancel
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdStockOrderCancel;

        /**
         * Creates a plain object from a CmdStockOrderCancel message. Also converts values to other types if specified.
         * @param message CmdStockOrderCancel
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdStockOrderCancel, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdStockOrderCancel to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StockOrder. */
    interface IStockOrder {

        /** StockOrder orderId */
        orderId?: (number|Long|null);

        /** StockOrder code */
        code?: (number|null);

        /** StockOrder type */
        type?: (pb.OrderType|null);

        /** StockOrder state */
        state?: (pb.OrderState|null);

        /** StockOrder price */
        price?: (number|null);

        /** StockOrder volume */
        volume?: (number|null);

        /** StockOrder uid */
        uid?: (number|null);

        /** StockOrder ts */
        ts?: (number|Long|null);

        /** StockOrder id */
        id?: (number|null);

        /** StockOrder node */
        node?: (number|null);

        /** StockOrder cost */
        cost?: (number|null);
    }

    /** Represents a StockOrder. */
    class StockOrder implements IStockOrder {

        /**
         * Constructs a new StockOrder.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IStockOrder);

        /** StockOrder orderId. */
        public orderId: (number|Long);

        /** StockOrder code. */
        public code: number;

        /** StockOrder type. */
        public type: pb.OrderType;

        /** StockOrder state. */
        public state: pb.OrderState;

        /** StockOrder price. */
        public price: number;

        /** StockOrder volume. */
        public volume: number;

        /** StockOrder uid. */
        public uid: number;

        /** StockOrder ts. */
        public ts: (number|Long);

        /** StockOrder id. */
        public id: number;

        /** StockOrder node. */
        public node: number;

        /** StockOrder cost. */
        public cost: number;

        /**
         * Creates a new StockOrder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StockOrder instance
         */
        public static create(properties?: pb.IStockOrder): pb.StockOrder;

        /**
         * Encodes the specified StockOrder message. Does not implicitly {@link pb.StockOrder.verify|verify} messages.
         * @param message StockOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IStockOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StockOrder message, length delimited. Does not implicitly {@link pb.StockOrder.verify|verify} messages.
         * @param message StockOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IStockOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StockOrder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StockOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.StockOrder;

        /**
         * Decodes a StockOrder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StockOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StockOrder;

        /**
         * Verifies a StockOrder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StockOrder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StockOrder
         */
        public static fromObject(object: { [k: string]: any }): pb.StockOrder;

        /**
         * Creates a plain object from a StockOrder message. Also converts values to other types if specified.
         * @param message StockOrder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.StockOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StockOrder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StockOrderList. */
    interface IStockOrderList {

        /** StockOrderList items */
        items?: (pb.IStockOrder[]|null);
    }

    /** Represents a StockOrderList. */
    class StockOrderList implements IStockOrderList {

        /**
         * Constructs a new StockOrderList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IStockOrderList);

        /** StockOrderList items. */
        public items: pb.IStockOrder[];

        /**
         * Creates a new StockOrderList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StockOrderList instance
         */
        public static create(properties?: pb.IStockOrderList): pb.StockOrderList;

        /**
         * Encodes the specified StockOrderList message. Does not implicitly {@link pb.StockOrderList.verify|verify} messages.
         * @param message StockOrderList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IStockOrderList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StockOrderList message, length delimited. Does not implicitly {@link pb.StockOrderList.verify|verify} messages.
         * @param message StockOrderList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IStockOrderList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StockOrderList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StockOrderList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.StockOrderList;

        /**
         * Decodes a StockOrderList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StockOrderList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StockOrderList;

        /**
         * Verifies a StockOrderList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StockOrderList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StockOrderList
         */
        public static fromObject(object: { [k: string]: any }): pb.StockOrderList;

        /**
         * Creates a plain object from a StockOrderList message. Also converts values to other types if specified.
         * @param message StockOrderList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.StockOrderList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StockOrderList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StockOrderResult. */
    interface IStockOrderResult {

        /** StockOrderResult result */
        result?: (pb.IErrorInfo|null);

        /** StockOrderResult order */
        order?: (pb.IStockOrder|null);
    }

    /** Represents a StockOrderResult. */
    class StockOrderResult implements IStockOrderResult {

        /**
         * Constructs a new StockOrderResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IStockOrderResult);

        /** StockOrderResult result. */
        public result?: (pb.IErrorInfo|null);

        /** StockOrderResult order. */
        public order?: (pb.IStockOrder|null);

        /**
         * Creates a new StockOrderResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StockOrderResult instance
         */
        public static create(properties?: pb.IStockOrderResult): pb.StockOrderResult;

        /**
         * Encodes the specified StockOrderResult message. Does not implicitly {@link pb.StockOrderResult.verify|verify} messages.
         * @param message StockOrderResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IStockOrderResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StockOrderResult message, length delimited. Does not implicitly {@link pb.StockOrderResult.verify|verify} messages.
         * @param message StockOrderResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IStockOrderResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StockOrderResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StockOrderResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.StockOrderResult;

        /**
         * Decodes a StockOrderResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StockOrderResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StockOrderResult;

        /**
         * Verifies a StockOrderResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StockOrderResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StockOrderResult
         */
        public static fromObject(object: { [k: string]: any }): pb.StockOrderResult;

        /**
         * Creates a plain object from a StockOrderResult message. Also converts values to other types if specified.
         * @param message StockOrderResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.StockOrderResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StockOrderResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StockPosition. */
    interface IStockPosition {

        /** StockPosition code */
        code?: (number|null);

        /** StockPosition volumeFree */
        volumeFree?: (number|null);

        /** StockPosition volume */
        volume?: (number|null);

        /** StockPosition priceCost */
        priceCost?: (number|null);
    }

    /** Represents a StockPosition. */
    class StockPosition implements IStockPosition {

        /**
         * Constructs a new StockPosition.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IStockPosition);

        /** StockPosition code. */
        public code: number;

        /** StockPosition volumeFree. */
        public volumeFree: number;

        /** StockPosition volume. */
        public volume: number;

        /** StockPosition priceCost. */
        public priceCost: number;

        /**
         * Creates a new StockPosition instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StockPosition instance
         */
        public static create(properties?: pb.IStockPosition): pb.StockPosition;

        /**
         * Encodes the specified StockPosition message. Does not implicitly {@link pb.StockPosition.verify|verify} messages.
         * @param message StockPosition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IStockPosition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StockPosition message, length delimited. Does not implicitly {@link pb.StockPosition.verify|verify} messages.
         * @param message StockPosition message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IStockPosition, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StockPosition message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StockPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.StockPosition;

        /**
         * Decodes a StockPosition message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StockPosition
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StockPosition;

        /**
         * Verifies a StockPosition message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StockPosition message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StockPosition
         */
        public static fromObject(object: { [k: string]: any }): pb.StockPosition;

        /**
         * Creates a plain object from a StockPosition message. Also converts values to other types if specified.
         * @param message StockPosition
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.StockPosition, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StockPosition to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a StockPositionList. */
    interface IStockPositionList {

        /** StockPositionList items */
        items?: (pb.IStockPosition[]|null);
    }

    /** Represents a StockPositionList. */
    class StockPositionList implements IStockPositionList {

        /**
         * Constructs a new StockPositionList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IStockPositionList);

        /** StockPositionList items. */
        public items: pb.IStockPosition[];

        /**
         * Creates a new StockPositionList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StockPositionList instance
         */
        public static create(properties?: pb.IStockPositionList): pb.StockPositionList;

        /**
         * Encodes the specified StockPositionList message. Does not implicitly {@link pb.StockPositionList.verify|verify} messages.
         * @param message StockPositionList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IStockPositionList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StockPositionList message, length delimited. Does not implicitly {@link pb.StockPositionList.verify|verify} messages.
         * @param message StockPositionList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IStockPositionList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StockPositionList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StockPositionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.StockPositionList;

        /**
         * Decodes a StockPositionList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StockPositionList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.StockPositionList;

        /**
         * Verifies a StockPositionList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StockPositionList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StockPositionList
         */
        public static fromObject(object: { [k: string]: any }): pb.StockPositionList;

        /**
         * Creates a plain object from a StockPositionList message. Also converts values to other types if specified.
         * @param message StockPositionList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.StockPositionList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StockPositionList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdMncgExchange. */
    interface ICmdMncgExchange {

        /** CmdMncgExchange direction */
        direction?: (pb.ExchangeDirection|null);

        /** CmdMncgExchange amount */
        amount?: (number|Long|null);
    }

    /** Represents a CmdMncgExchange. */
    class CmdMncgExchange implements ICmdMncgExchange {

        /**
         * Constructs a new CmdMncgExchange.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdMncgExchange);

        /** CmdMncgExchange direction. */
        public direction: pb.ExchangeDirection;

        /** CmdMncgExchange amount. */
        public amount: (number|Long);

        /**
         * Creates a new CmdMncgExchange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdMncgExchange instance
         */
        public static create(properties?: pb.ICmdMncgExchange): pb.CmdMncgExchange;

        /**
         * Encodes the specified CmdMncgExchange message. Does not implicitly {@link pb.CmdMncgExchange.verify|verify} messages.
         * @param message CmdMncgExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdMncgExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdMncgExchange message, length delimited. Does not implicitly {@link pb.CmdMncgExchange.verify|verify} messages.
         * @param message CmdMncgExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdMncgExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdMncgExchange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdMncgExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdMncgExchange;

        /**
         * Decodes a CmdMncgExchange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdMncgExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdMncgExchange;

        /**
         * Verifies a CmdMncgExchange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdMncgExchange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdMncgExchange
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdMncgExchange;

        /**
         * Creates a plain object from a CmdMncgExchange message. Also converts values to other types if specified.
         * @param message CmdMncgExchange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdMncgExchange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdMncgExchange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdMncgExchangeReply. */
    interface ICmdMncgExchangeReply {

        /** CmdMncgExchangeReply result */
        result?: (pb.IErrorInfo|null);

        /** CmdMncgExchangeReply account */
        account?: (number|null);
    }

    /** Represents a CmdMncgExchangeReply. */
    class CmdMncgExchangeReply implements ICmdMncgExchangeReply {

        /**
         * Constructs a new CmdMncgExchangeReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdMncgExchangeReply);

        /** CmdMncgExchangeReply result. */
        public result?: (pb.IErrorInfo|null);

        /** CmdMncgExchangeReply account. */
        public account: number;

        /**
         * Creates a new CmdMncgExchangeReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdMncgExchangeReply instance
         */
        public static create(properties?: pb.ICmdMncgExchangeReply): pb.CmdMncgExchangeReply;

        /**
         * Encodes the specified CmdMncgExchangeReply message. Does not implicitly {@link pb.CmdMncgExchangeReply.verify|verify} messages.
         * @param message CmdMncgExchangeReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdMncgExchangeReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdMncgExchangeReply message, length delimited. Does not implicitly {@link pb.CmdMncgExchangeReply.verify|verify} messages.
         * @param message CmdMncgExchangeReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdMncgExchangeReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdMncgExchangeReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdMncgExchangeReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdMncgExchangeReply;

        /**
         * Decodes a CmdMncgExchangeReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdMncgExchangeReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdMncgExchangeReply;

        /**
         * Verifies a CmdMncgExchangeReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdMncgExchangeReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdMncgExchangeReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdMncgExchangeReply;

        /**
         * Creates a plain object from a CmdMncgExchangeReply message. Also converts values to other types if specified.
         * @param message CmdMncgExchangeReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdMncgExchangeReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdMncgExchangeReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdMncgEditStock. */
    interface ICmdMncgEditStock {

        /** CmdMncgEditStock removed */
        removed?: (boolean|null);

        /** CmdMncgEditStock code */
        code?: (number|null);

        /** CmdMncgEditStock id */
        id?: (number|null);

        /** CmdMncgEditStock isAiStock */
        isAiStock?: (boolean|null);
    }

    /** Represents a CmdMncgEditStock. */
    class CmdMncgEditStock implements ICmdMncgEditStock {

        /**
         * Constructs a new CmdMncgEditStock.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdMncgEditStock);

        /** CmdMncgEditStock removed. */
        public removed: boolean;

        /** CmdMncgEditStock code. */
        public code: number;

        /** CmdMncgEditStock id. */
        public id: number;

        /** CmdMncgEditStock isAiStock. */
        public isAiStock: boolean;

        /**
         * Creates a new CmdMncgEditStock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdMncgEditStock instance
         */
        public static create(properties?: pb.ICmdMncgEditStock): pb.CmdMncgEditStock;

        /**
         * Encodes the specified CmdMncgEditStock message. Does not implicitly {@link pb.CmdMncgEditStock.verify|verify} messages.
         * @param message CmdMncgEditStock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdMncgEditStock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdMncgEditStock message, length delimited. Does not implicitly {@link pb.CmdMncgEditStock.verify|verify} messages.
         * @param message CmdMncgEditStock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdMncgEditStock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdMncgEditStock message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdMncgEditStock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdMncgEditStock;

        /**
         * Decodes a CmdMncgEditStock message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdMncgEditStock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdMncgEditStock;

        /**
         * Verifies a CmdMncgEditStock message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdMncgEditStock message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdMncgEditStock
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdMncgEditStock;

        /**
         * Creates a plain object from a CmdMncgEditStock message. Also converts values to other types if specified.
         * @param message CmdMncgEditStock
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdMncgEditStock, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdMncgEditStock to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryStockOrder. */
    interface ICmdQueryStockOrder {

        /** CmdQueryStockOrder uid */
        uid?: (number|null);

        /** CmdQueryStockOrder from */
        from?: (number|Long|null);

        /** CmdQueryStockOrder to */
        to?: (number|Long|null);

        /** CmdQueryStockOrder pageSize */
        pageSize?: (number|null);

        /** CmdQueryStockOrder orderId */
        orderId?: (number|Long|null);

        /** CmdQueryStockOrder id */
        id?: (number|null);
    }

    /** Represents a CmdQueryStockOrder. */
    class CmdQueryStockOrder implements ICmdQueryStockOrder {

        /**
         * Constructs a new CmdQueryStockOrder.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryStockOrder);

        /** CmdQueryStockOrder uid. */
        public uid: number;

        /** CmdQueryStockOrder from. */
        public from: (number|Long);

        /** CmdQueryStockOrder to. */
        public to: (number|Long);

        /** CmdQueryStockOrder pageSize. */
        public pageSize: number;

        /** CmdQueryStockOrder orderId. */
        public orderId: (number|Long);

        /** CmdQueryStockOrder id. */
        public id: number;

        /**
         * Creates a new CmdQueryStockOrder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryStockOrder instance
         */
        public static create(properties?: pb.ICmdQueryStockOrder): pb.CmdQueryStockOrder;

        /**
         * Encodes the specified CmdQueryStockOrder message. Does not implicitly {@link pb.CmdQueryStockOrder.verify|verify} messages.
         * @param message CmdQueryStockOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryStockOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryStockOrder message, length delimited. Does not implicitly {@link pb.CmdQueryStockOrder.verify|verify} messages.
         * @param message CmdQueryStockOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryStockOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryStockOrder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryStockOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryStockOrder;

        /**
         * Decodes a CmdQueryStockOrder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryStockOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryStockOrder;

        /**
         * Verifies a CmdQueryStockOrder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryStockOrder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryStockOrder
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryStockOrder;

        /**
         * Creates a plain object from a CmdQueryStockOrder message. Also converts values to other types if specified.
         * @param message CmdQueryStockOrder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryStockOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryStockOrder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgdsConf. */
    interface ICgdsConf {

        /** CgdsConf id */
        id?: (number|null);

        /** CgdsConf regTo */
        regTo?: (number|Long|null);

        /** CgdsConf from */
        from?: (number|Long|null);

        /** CgdsConf to */
        to?: (number|Long|null);

        /** CgdsConf conf */
        conf?: (string|null);

        /** CgdsConf award */
        award?: (string|null);

        /** CgdsConf status */
        status?: (number|null);

        /** CgdsConf title */
        title?: (string|null);

        /** CgdsConf logo */
        logo?: (string|null);

        /** CgdsConf url */
        url?: (string|null);
    }

    /** Represents a CgdsConf. */
    class CgdsConf implements ICgdsConf {

        /**
         * Constructs a new CgdsConf.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgdsConf);

        /** CgdsConf id. */
        public id: number;

        /** CgdsConf regTo. */
        public regTo: (number|Long);

        /** CgdsConf from. */
        public from: (number|Long);

        /** CgdsConf to. */
        public to: (number|Long);

        /** CgdsConf conf. */
        public conf: string;

        /** CgdsConf award. */
        public award: string;

        /** CgdsConf status. */
        public status: number;

        /** CgdsConf title. */
        public title: string;

        /** CgdsConf logo. */
        public logo: string;

        /** CgdsConf url. */
        public url: string;

        /**
         * Creates a new CgdsConf instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgdsConf instance
         */
        public static create(properties?: pb.ICgdsConf): pb.CgdsConf;

        /**
         * Encodes the specified CgdsConf message. Does not implicitly {@link pb.CgdsConf.verify|verify} messages.
         * @param message CgdsConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgdsConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgdsConf message, length delimited. Does not implicitly {@link pb.CgdsConf.verify|verify} messages.
         * @param message CgdsConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgdsConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgdsConf message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgdsConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgdsConf;

        /**
         * Decodes a CgdsConf message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgdsConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgdsConf;

        /**
         * Verifies a CgdsConf message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgdsConf message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgdsConf
         */
        public static fromObject(object: { [k: string]: any }): pb.CgdsConf;

        /**
         * Creates a plain object from a CgdsConf message. Also converts values to other types if specified.
         * @param message CgdsConf
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgdsConf, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgdsConf to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CgdsList. */
    interface ICgdsList {

        /** CgdsList items */
        items?: (pb.ICgdsConf[]|null);
    }

    /** Represents a CgdsList. */
    class CgdsList implements ICgdsList {

        /**
         * Constructs a new CgdsList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgdsList);

        /** CgdsList items. */
        public items: pb.ICgdsConf[];

        /**
         * Creates a new CgdsList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CgdsList instance
         */
        public static create(properties?: pb.ICgdsList): pb.CgdsList;

        /**
         * Encodes the specified CgdsList message. Does not implicitly {@link pb.CgdsList.verify|verify} messages.
         * @param message CgdsList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICgdsList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CgdsList message, length delimited. Does not implicitly {@link pb.CgdsList.verify|verify} messages.
         * @param message CgdsList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICgdsList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CgdsList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CgdsList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CgdsList;

        /**
         * Decodes a CgdsList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CgdsList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CgdsList;

        /**
         * Verifies a CgdsList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CgdsList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CgdsList
         */
        public static fromObject(object: { [k: string]: any }): pb.CgdsList;

        /**
         * Creates a plain object from a CgdsList message. Also converts values to other types if specified.
         * @param message CgdsList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CgdsList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CgdsList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdCgdsReg. */
    interface ICmdCgdsReg {

        /** CmdCgdsReg id */
        id?: (number|null);
    }

    /** Represents a CmdCgdsReg. */
    class CmdCgdsReg implements ICmdCgdsReg {

        /**
         * Constructs a new CmdCgdsReg.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdCgdsReg);

        /** CmdCgdsReg id. */
        public id: number;

        /**
         * Creates a new CmdCgdsReg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdCgdsReg instance
         */
        public static create(properties?: pb.ICmdCgdsReg): pb.CmdCgdsReg;

        /**
         * Encodes the specified CmdCgdsReg message. Does not implicitly {@link pb.CmdCgdsReg.verify|verify} messages.
         * @param message CmdCgdsReg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdCgdsReg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdCgdsReg message, length delimited. Does not implicitly {@link pb.CmdCgdsReg.verify|verify} messages.
         * @param message CmdCgdsReg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdCgdsReg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdCgdsReg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdCgdsReg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdCgdsReg;

        /**
         * Decodes a CmdCgdsReg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdCgdsReg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdCgdsReg;

        /**
         * Verifies a CmdCgdsReg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdCgdsReg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdCgdsReg
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdCgdsReg;

        /**
         * Creates a plain object from a CmdCgdsReg message. Also converts values to other types if specified.
         * @param message CmdCgdsReg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdCgdsReg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdCgdsReg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdCgdsRegReply. */
    interface ICmdCgdsRegReply {

        /** CmdCgdsRegReply result */
        result?: (pb.IErrorInfo|null);

        /** CmdCgdsRegReply cgdsStateItem */
        cgdsStateItem?: (pb.ICgdsStateItem|null);
    }

    /** Represents a CmdCgdsRegReply. */
    class CmdCgdsRegReply implements ICmdCgdsRegReply {

        /**
         * Constructs a new CmdCgdsRegReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdCgdsRegReply);

        /** CmdCgdsRegReply result. */
        public result?: (pb.IErrorInfo|null);

        /** CmdCgdsRegReply cgdsStateItem. */
        public cgdsStateItem?: (pb.ICgdsStateItem|null);

        /**
         * Creates a new CmdCgdsRegReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdCgdsRegReply instance
         */
        public static create(properties?: pb.ICmdCgdsRegReply): pb.CmdCgdsRegReply;

        /**
         * Encodes the specified CmdCgdsRegReply message. Does not implicitly {@link pb.CmdCgdsRegReply.verify|verify} messages.
         * @param message CmdCgdsRegReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdCgdsRegReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdCgdsRegReply message, length delimited. Does not implicitly {@link pb.CmdCgdsRegReply.verify|verify} messages.
         * @param message CmdCgdsRegReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdCgdsRegReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdCgdsRegReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdCgdsRegReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdCgdsRegReply;

        /**
         * Decodes a CmdCgdsRegReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdCgdsRegReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdCgdsRegReply;

        /**
         * Verifies a CmdCgdsRegReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdCgdsRegReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdCgdsRegReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdCgdsRegReply;

        /**
         * Creates a plain object from a CmdCgdsRegReply message. Also converts values to other types if specified.
         * @param message CmdCgdsRegReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdCgdsRegReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdCgdsRegReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdCgdsRanking. */
    interface ICmdCgdsRanking {

        /** CmdCgdsRanking id */
        id?: (number|null);
    }

    /** Represents a CmdCgdsRanking. */
    class CmdCgdsRanking implements ICmdCgdsRanking {

        /**
         * Constructs a new CmdCgdsRanking.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdCgdsRanking);

        /** CmdCgdsRanking id. */
        public id: number;

        /**
         * Creates a new CmdCgdsRanking instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdCgdsRanking instance
         */
        public static create(properties?: pb.ICmdCgdsRanking): pb.CmdCgdsRanking;

        /**
         * Encodes the specified CmdCgdsRanking message. Does not implicitly {@link pb.CmdCgdsRanking.verify|verify} messages.
         * @param message CmdCgdsRanking message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdCgdsRanking, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdCgdsRanking message, length delimited. Does not implicitly {@link pb.CmdCgdsRanking.verify|verify} messages.
         * @param message CmdCgdsRanking message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdCgdsRanking, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdCgdsRanking message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdCgdsRanking
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdCgdsRanking;

        /**
         * Decodes a CmdCgdsRanking message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdCgdsRanking
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdCgdsRanking;

        /**
         * Verifies a CmdCgdsRanking message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdCgdsRanking message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdCgdsRanking
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdCgdsRanking;

        /**
         * Creates a plain object from a CmdCgdsRanking message. Also converts values to other types if specified.
         * @param message CmdCgdsRanking
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdCgdsRanking, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdCgdsRanking to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** PriceType enum. */
    enum PriceType {
        PriceType_NULL = 0,
        Open = 1,
        Close = 2,
        High = 3,
        Low = 4
    }

    /** ZsjcGameType enum. */
    enum ZsjcGameType {
        kpjc = 0,
        drjc = 1,
        spjc = 2
    }

    /** Properties of a ZsjcOption. */
    interface IZsjcOption {

        /** ZsjcOption ts */
        ts?: (number|Long|null);

        /** ZsjcOption pt */
        pt?: (pb.PriceType|null);

        /** ZsjcOption money */
        money?: (number|null);
    }

    /** Represents a ZsjcOption. */
    class ZsjcOption implements IZsjcOption {

        /**
         * Constructs a new ZsjcOption.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcOption);

        /** ZsjcOption ts. */
        public ts: (number|Long);

        /** ZsjcOption pt. */
        public pt: pb.PriceType;

        /** ZsjcOption money. */
        public money: number;

        /**
         * Creates a new ZsjcOption instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcOption instance
         */
        public static create(properties?: pb.IZsjcOption): pb.ZsjcOption;

        /**
         * Encodes the specified ZsjcOption message. Does not implicitly {@link pb.ZsjcOption.verify|verify} messages.
         * @param message ZsjcOption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcOption, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcOption message, length delimited. Does not implicitly {@link pb.ZsjcOption.verify|verify} messages.
         * @param message ZsjcOption message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcOption, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcOption message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcOption;

        /**
         * Decodes a ZsjcOption message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcOption
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcOption;

        /**
         * Verifies a ZsjcOption message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcOption message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcOption
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcOption;

        /**
         * Creates a plain object from a ZsjcOption message. Also converts values to other types if specified.
         * @param message ZsjcOption
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcOption, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcOption to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZsjcGameData. */
    interface IZsjcGameData {

        /** ZsjcGameData gameType */
        gameType?: (pb.ZsjcGameType|null);

        /** ZsjcGameData code */
        code?: (number|null);

        /** ZsjcGameData tsSettling */
        tsSettling?: (number|Long|null);

        /** ZsjcGameData settled */
        settled?: (boolean|null);

        /** ZsjcGameData first */
        first?: (pb.IZsjcOption|null);

        /** ZsjcGameData second */
        second?: (pb.IZsjcOption|null);
    }

    /** Represents a ZsjcGameData. */
    class ZsjcGameData implements IZsjcGameData {

        /**
         * Constructs a new ZsjcGameData.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcGameData);

        /** ZsjcGameData gameType. */
        public gameType: pb.ZsjcGameType;

        /** ZsjcGameData code. */
        public code: number;

        /** ZsjcGameData tsSettling. */
        public tsSettling: (number|Long);

        /** ZsjcGameData settled. */
        public settled: boolean;

        /** ZsjcGameData first. */
        public first?: (pb.IZsjcOption|null);

        /** ZsjcGameData second. */
        public second?: (pb.IZsjcOption|null);

        /**
         * Creates a new ZsjcGameData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcGameData instance
         */
        public static create(properties?: pb.IZsjcGameData): pb.ZsjcGameData;

        /**
         * Encodes the specified ZsjcGameData message. Does not implicitly {@link pb.ZsjcGameData.verify|verify} messages.
         * @param message ZsjcGameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcGameData message, length delimited. Does not implicitly {@link pb.ZsjcGameData.verify|verify} messages.
         * @param message ZsjcGameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcGameData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcGameData;

        /**
         * Decodes a ZsjcGameData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcGameData;

        /**
         * Verifies a ZsjcGameData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcGameData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcGameData
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcGameData;

        /**
         * Creates a plain object from a ZsjcGameData message. Also converts values to other types if specified.
         * @param message ZsjcGameData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcGameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcGameData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZsjcGameList. */
    interface IZsjcGameList {

        /** ZsjcGameList items */
        items?: (pb.IZsjcGameData[]|null);
    }

    /** Represents a ZsjcGameList. */
    class ZsjcGameList implements IZsjcGameList {

        /**
         * Constructs a new ZsjcGameList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcGameList);

        /** ZsjcGameList items. */
        public items: pb.IZsjcGameData[];

        /**
         * Creates a new ZsjcGameList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcGameList instance
         */
        public static create(properties?: pb.IZsjcGameList): pb.ZsjcGameList;

        /**
         * Encodes the specified ZsjcGameList message. Does not implicitly {@link pb.ZsjcGameList.verify|verify} messages.
         * @param message ZsjcGameList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcGameList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcGameList message, length delimited. Does not implicitly {@link pb.ZsjcGameList.verify|verify} messages.
         * @param message ZsjcGameList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcGameList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcGameList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcGameList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcGameList;

        /**
         * Decodes a ZsjcGameList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcGameList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcGameList;

        /**
         * Verifies a ZsjcGameList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcGameList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcGameList
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcGameList;

        /**
         * Creates a plain object from a ZsjcGameList message. Also converts values to other types if specified.
         * @param message ZsjcGameList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcGameList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcGameList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdBet. */
    interface ICmdBet {

        /** CmdBet uid */
        uid?: (number|null);

        /** CmdBet money */
        money?: (number|null);

        /** CmdBet gameIndex */
        gameIndex?: (number|null);

        /** CmdBet betting */
        betting?: (number|null);

        /** CmdBet nickname */
        nickname?: (string|null);

        /** CmdBet icon */
        icon?: (string|null);

        /** CmdBet gender */
        gender?: (string|null);
    }

    /** Represents a CmdBet. */
    class CmdBet implements ICmdBet {

        /**
         * Constructs a new CmdBet.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdBet);

        /** CmdBet uid. */
        public uid: number;

        /** CmdBet money. */
        public money: number;

        /** CmdBet gameIndex. */
        public gameIndex: number;

        /** CmdBet betting. */
        public betting: number;

        /** CmdBet nickname. */
        public nickname: string;

        /** CmdBet icon. */
        public icon: string;

        /** CmdBet gender. */
        public gender: string;

        /**
         * Creates a new CmdBet instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdBet instance
         */
        public static create(properties?: pb.ICmdBet): pb.CmdBet;

        /**
         * Encodes the specified CmdBet message. Does not implicitly {@link pb.CmdBet.verify|verify} messages.
         * @param message CmdBet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdBet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdBet message, length delimited. Does not implicitly {@link pb.CmdBet.verify|verify} messages.
         * @param message CmdBet message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdBet, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdBet message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdBet;

        /**
         * Decodes a CmdBet message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdBet
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdBet;

        /**
         * Verifies a CmdBet message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdBet message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdBet
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdBet;

        /**
         * Creates a plain object from a CmdBet message. Also converts values to other types if specified.
         * @param message CmdBet
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdBet, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdBet to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdZsjcPlayerBettingList. */
    interface ICmdZsjcPlayerBettingList {

        /** CmdZsjcPlayerBettingList code */
        code?: (number|null);

        /** CmdZsjcPlayerBettingList gametype */
        gametype?: (number|null);
    }

    /** Represents a CmdZsjcPlayerBettingList. */
    class CmdZsjcPlayerBettingList implements ICmdZsjcPlayerBettingList {

        /**
         * Constructs a new CmdZsjcPlayerBettingList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdZsjcPlayerBettingList);

        /** CmdZsjcPlayerBettingList code. */
        public code: number;

        /** CmdZsjcPlayerBettingList gametype. */
        public gametype: number;

        /**
         * Creates a new CmdZsjcPlayerBettingList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdZsjcPlayerBettingList instance
         */
        public static create(properties?: pb.ICmdZsjcPlayerBettingList): pb.CmdZsjcPlayerBettingList;

        /**
         * Encodes the specified CmdZsjcPlayerBettingList message. Does not implicitly {@link pb.CmdZsjcPlayerBettingList.verify|verify} messages.
         * @param message CmdZsjcPlayerBettingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdZsjcPlayerBettingList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdZsjcPlayerBettingList message, length delimited. Does not implicitly {@link pb.CmdZsjcPlayerBettingList.verify|verify} messages.
         * @param message CmdZsjcPlayerBettingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdZsjcPlayerBettingList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdZsjcPlayerBettingList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdZsjcPlayerBettingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdZsjcPlayerBettingList;

        /**
         * Decodes a CmdZsjcPlayerBettingList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdZsjcPlayerBettingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdZsjcPlayerBettingList;

        /**
         * Verifies a CmdZsjcPlayerBettingList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdZsjcPlayerBettingList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdZsjcPlayerBettingList
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdZsjcPlayerBettingList;

        /**
         * Creates a plain object from a CmdZsjcPlayerBettingList message. Also converts values to other types if specified.
         * @param message CmdZsjcPlayerBettingList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdZsjcPlayerBettingList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdZsjcPlayerBettingList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZsjcPlayerBettingList. */
    interface IZsjcPlayerBettingList {

        /** ZsjcPlayerBettingList code */
        code?: (number|null);

        /** ZsjcPlayerBettingList gametype */
        gametype?: (number|null);

        /** ZsjcPlayerBettingList Items */
        Items?: (pb.IRankingItem[]|null);
    }

    /** Represents a ZsjcPlayerBettingList. */
    class ZsjcPlayerBettingList implements IZsjcPlayerBettingList {

        /**
         * Constructs a new ZsjcPlayerBettingList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcPlayerBettingList);

        /** ZsjcPlayerBettingList code. */
        public code: number;

        /** ZsjcPlayerBettingList gametype. */
        public gametype: number;

        /** ZsjcPlayerBettingList Items. */
        public Items: pb.IRankingItem[];

        /**
         * Creates a new ZsjcPlayerBettingList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcPlayerBettingList instance
         */
        public static create(properties?: pb.IZsjcPlayerBettingList): pb.ZsjcPlayerBettingList;

        /**
         * Encodes the specified ZsjcPlayerBettingList message. Does not implicitly {@link pb.ZsjcPlayerBettingList.verify|verify} messages.
         * @param message ZsjcPlayerBettingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcPlayerBettingList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcPlayerBettingList message, length delimited. Does not implicitly {@link pb.ZsjcPlayerBettingList.verify|verify} messages.
         * @param message ZsjcPlayerBettingList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcPlayerBettingList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcPlayerBettingList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcPlayerBettingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcPlayerBettingList;

        /**
         * Decodes a ZsjcPlayerBettingList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcPlayerBettingList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcPlayerBettingList;

        /**
         * Verifies a ZsjcPlayerBettingList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcPlayerBettingList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcPlayerBettingList
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcPlayerBettingList;

        /**
         * Creates a plain object from a ZsjcPlayerBettingList message. Also converts values to other types if specified.
         * @param message ZsjcPlayerBettingList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcPlayerBettingList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcPlayerBettingList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdZsjcBettingResultList. */
    interface ICmdZsjcBettingResultList {

        /** CmdZsjcBettingResultList uid */
        uid?: (number|null);

        /** CmdZsjcBettingResultList code */
        code?: (number|null);

        /** CmdZsjcBettingResultList gametype */
        gametype?: (number|null);

        /** CmdZsjcBettingResultList from */
        from?: (number|Long|null);

        /** CmdZsjcBettingResultList to */
        to?: (number|Long|null);

        /** CmdZsjcBettingResultList total */
        total?: (number|null);
    }

    /** Represents a CmdZsjcBettingResultList. */
    class CmdZsjcBettingResultList implements ICmdZsjcBettingResultList {

        /**
         * Constructs a new CmdZsjcBettingResultList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdZsjcBettingResultList);

        /** CmdZsjcBettingResultList uid. */
        public uid: number;

        /** CmdZsjcBettingResultList code. */
        public code: number;

        /** CmdZsjcBettingResultList gametype. */
        public gametype: number;

        /** CmdZsjcBettingResultList from. */
        public from: (number|Long);

        /** CmdZsjcBettingResultList to. */
        public to: (number|Long);

        /** CmdZsjcBettingResultList total. */
        public total: number;

        /**
         * Creates a new CmdZsjcBettingResultList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdZsjcBettingResultList instance
         */
        public static create(properties?: pb.ICmdZsjcBettingResultList): pb.CmdZsjcBettingResultList;

        /**
         * Encodes the specified CmdZsjcBettingResultList message. Does not implicitly {@link pb.CmdZsjcBettingResultList.verify|verify} messages.
         * @param message CmdZsjcBettingResultList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdZsjcBettingResultList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdZsjcBettingResultList message, length delimited. Does not implicitly {@link pb.CmdZsjcBettingResultList.verify|verify} messages.
         * @param message CmdZsjcBettingResultList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdZsjcBettingResultList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdZsjcBettingResultList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdZsjcBettingResultList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdZsjcBettingResultList;

        /**
         * Decodes a CmdZsjcBettingResultList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdZsjcBettingResultList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdZsjcBettingResultList;

        /**
         * Verifies a CmdZsjcBettingResultList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdZsjcBettingResultList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdZsjcBettingResultList
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdZsjcBettingResultList;

        /**
         * Creates a plain object from a CmdZsjcBettingResultList message. Also converts values to other types if specified.
         * @param message CmdZsjcBettingResultList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdZsjcBettingResultList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdZsjcBettingResultList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZsjcBettingResultItem. */
    interface IZsjcBettingResultItem {

        /** ZsjcBettingResultItem uid */
        uid?: (number|null);

        /** ZsjcBettingResultItem code */
        code?: (number|null);

        /** ZsjcBettingResultItem gametype */
        gametype?: (number|null);

        /** ZsjcBettingResultItem betting */
        betting?: (number|null);

        /** ZsjcBettingResultItem money */
        money?: (number|null);

        /** ZsjcBettingResultItem bonus */
        bonus?: (number|null);

        /** ZsjcBettingResultItem tsBetting */
        tsBetting?: (number|Long|null);

        /** ZsjcBettingResultItem tsSettling */
        tsSettling?: (number|Long|null);
    }

    /** Represents a ZsjcBettingResultItem. */
    class ZsjcBettingResultItem implements IZsjcBettingResultItem {

        /**
         * Constructs a new ZsjcBettingResultItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcBettingResultItem);

        /** ZsjcBettingResultItem uid. */
        public uid: number;

        /** ZsjcBettingResultItem code. */
        public code: number;

        /** ZsjcBettingResultItem gametype. */
        public gametype: number;

        /** ZsjcBettingResultItem betting. */
        public betting: number;

        /** ZsjcBettingResultItem money. */
        public money: number;

        /** ZsjcBettingResultItem bonus. */
        public bonus: number;

        /** ZsjcBettingResultItem tsBetting. */
        public tsBetting: (number|Long);

        /** ZsjcBettingResultItem tsSettling. */
        public tsSettling: (number|Long);

        /**
         * Creates a new ZsjcBettingResultItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcBettingResultItem instance
         */
        public static create(properties?: pb.IZsjcBettingResultItem): pb.ZsjcBettingResultItem;

        /**
         * Encodes the specified ZsjcBettingResultItem message. Does not implicitly {@link pb.ZsjcBettingResultItem.verify|verify} messages.
         * @param message ZsjcBettingResultItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcBettingResultItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcBettingResultItem message, length delimited. Does not implicitly {@link pb.ZsjcBettingResultItem.verify|verify} messages.
         * @param message ZsjcBettingResultItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcBettingResultItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcBettingResultItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcBettingResultItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcBettingResultItem;

        /**
         * Decodes a ZsjcBettingResultItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcBettingResultItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcBettingResultItem;

        /**
         * Verifies a ZsjcBettingResultItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcBettingResultItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcBettingResultItem
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcBettingResultItem;

        /**
         * Creates a plain object from a ZsjcBettingResultItem message. Also converts values to other types if specified.
         * @param message ZsjcBettingResultItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcBettingResultItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcBettingResultItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ZsjcBettingResult. */
    interface IZsjcBettingResult {

        /** ZsjcBettingResult Items */
        Items?: (pb.IZsjcBettingResultItem[]|null);
    }

    /** Represents a ZsjcBettingResult. */
    class ZsjcBettingResult implements IZsjcBettingResult {

        /**
         * Constructs a new ZsjcBettingResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IZsjcBettingResult);

        /** ZsjcBettingResult Items. */
        public Items: pb.IZsjcBettingResultItem[];

        /**
         * Creates a new ZsjcBettingResult instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ZsjcBettingResult instance
         */
        public static create(properties?: pb.IZsjcBettingResult): pb.ZsjcBettingResult;

        /**
         * Encodes the specified ZsjcBettingResult message. Does not implicitly {@link pb.ZsjcBettingResult.verify|verify} messages.
         * @param message ZsjcBettingResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IZsjcBettingResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ZsjcBettingResult message, length delimited. Does not implicitly {@link pb.ZsjcBettingResult.verify|verify} messages.
         * @param message ZsjcBettingResult message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IZsjcBettingResult, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ZsjcBettingResult message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ZsjcBettingResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ZsjcBettingResult;

        /**
         * Decodes a ZsjcBettingResult message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ZsjcBettingResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ZsjcBettingResult;

        /**
         * Verifies a ZsjcBettingResult message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ZsjcBettingResult message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ZsjcBettingResult
         */
        public static fromObject(object: { [k: string]: any }): pb.ZsjcBettingResult;

        /**
         * Creates a plain object from a ZsjcBettingResult message. Also converts values to other types if specified.
         * @param message ZsjcBettingResult
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ZsjcBettingResult, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ZsjcBettingResult to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetWeeklyAward. */
    interface ICmdGetWeeklyAward {

        /** CmdGetWeeklyAward code */
        code?: (string|null);
    }

    /** Represents a CmdGetWeeklyAward. */
    class CmdGetWeeklyAward implements ICmdGetWeeklyAward {

        /**
         * Constructs a new CmdGetWeeklyAward.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetWeeklyAward);

        /** CmdGetWeeklyAward code. */
        public code: string;

        /**
         * Creates a new CmdGetWeeklyAward instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetWeeklyAward instance
         */
        public static create(properties?: pb.ICmdGetWeeklyAward): pb.CmdGetWeeklyAward;

        /**
         * Encodes the specified CmdGetWeeklyAward message. Does not implicitly {@link pb.CmdGetWeeklyAward.verify|verify} messages.
         * @param message CmdGetWeeklyAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetWeeklyAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetWeeklyAward message, length delimited. Does not implicitly {@link pb.CmdGetWeeklyAward.verify|verify} messages.
         * @param message CmdGetWeeklyAward message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetWeeklyAward, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetWeeklyAward message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetWeeklyAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetWeeklyAward;

        /**
         * Decodes a CmdGetWeeklyAward message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetWeeklyAward
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetWeeklyAward;

        /**
         * Verifies a CmdGetWeeklyAward message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetWeeklyAward message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetWeeklyAward
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetWeeklyAward;

        /**
         * Creates a plain object from a CmdGetWeeklyAward message. Also converts values to other types if specified.
         * @param message CmdGetWeeklyAward
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetWeeklyAward, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetWeeklyAward to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetWeeklyAwardReply. */
    interface ICmdGetWeeklyAwardReply {

        /** CmdGetWeeklyAwardReply result */
        result?: (pb.IErrorInfo|null);

        /** CmdGetWeeklyAwardReply award */
        award?: (pb.IGameProperties|null);
    }

    /** Represents a CmdGetWeeklyAwardReply. */
    class CmdGetWeeklyAwardReply implements ICmdGetWeeklyAwardReply {

        /**
         * Constructs a new CmdGetWeeklyAwardReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetWeeklyAwardReply);

        /** CmdGetWeeklyAwardReply result. */
        public result?: (pb.IErrorInfo|null);

        /** CmdGetWeeklyAwardReply award. */
        public award?: (pb.IGameProperties|null);

        /**
         * Creates a new CmdGetWeeklyAwardReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetWeeklyAwardReply instance
         */
        public static create(properties?: pb.ICmdGetWeeklyAwardReply): pb.CmdGetWeeklyAwardReply;

        /**
         * Encodes the specified CmdGetWeeklyAwardReply message. Does not implicitly {@link pb.CmdGetWeeklyAwardReply.verify|verify} messages.
         * @param message CmdGetWeeklyAwardReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetWeeklyAwardReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetWeeklyAwardReply message, length delimited. Does not implicitly {@link pb.CmdGetWeeklyAwardReply.verify|verify} messages.
         * @param message CmdGetWeeklyAwardReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetWeeklyAwardReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetWeeklyAwardReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetWeeklyAwardReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetWeeklyAwardReply;

        /**
         * Decodes a CmdGetWeeklyAwardReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetWeeklyAwardReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetWeeklyAwardReply;

        /**
         * Verifies a CmdGetWeeklyAwardReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetWeeklyAwardReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetWeeklyAwardReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetWeeklyAwardReply;

        /**
         * Creates a plain object from a CmdGetWeeklyAwardReply message. Also converts values to other types if specified.
         * @param message CmdGetWeeklyAwardReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetWeeklyAwardReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetWeeklyAwardReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryEventLog. */
    interface ICmdQueryEventLog {

        /** CmdQueryEventLog eventId */
        eventId?: (pb.EventId|null);

        /** CmdQueryEventLog uid */
        uid?: (number|null);

        /** CmdQueryEventLog from */
        from?: (number|Long|null);

        /** CmdQueryEventLog to */
        to?: (number|Long|null);

        /** CmdQueryEventLog total */
        total?: (number|null);
    }

    /** Represents a CmdQueryEventLog. */
    class CmdQueryEventLog implements ICmdQueryEventLog {

        /**
         * Constructs a new CmdQueryEventLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryEventLog);

        /** CmdQueryEventLog eventId. */
        public eventId: pb.EventId;

        /** CmdQueryEventLog uid. */
        public uid: number;

        /** CmdQueryEventLog from. */
        public from: (number|Long);

        /** CmdQueryEventLog to. */
        public to: (number|Long);

        /** CmdQueryEventLog total. */
        public total: number;

        /**
         * Creates a new CmdQueryEventLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryEventLog instance
         */
        public static create(properties?: pb.ICmdQueryEventLog): pb.CmdQueryEventLog;

        /**
         * Encodes the specified CmdQueryEventLog message. Does not implicitly {@link pb.CmdQueryEventLog.verify|verify} messages.
         * @param message CmdQueryEventLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryEventLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryEventLog message, length delimited. Does not implicitly {@link pb.CmdQueryEventLog.verify|verify} messages.
         * @param message CmdQueryEventLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryEventLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryEventLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryEventLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryEventLog;

        /**
         * Decodes a CmdQueryEventLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryEventLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryEventLog;

        /**
         * Verifies a CmdQueryEventLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryEventLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryEventLog
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryEventLog;

        /**
         * Creates a plain object from a CmdQueryEventLog message. Also converts values to other types if specified.
         * @param message CmdQueryEventLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryEventLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryEventLog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an EventLog. */
    interface IEventLog {

        /** EventLog eventId */
        eventId?: (pb.EventId|null);

        /** EventLog uid */
        uid?: (number|null);

        /** EventLog ts */
        ts?: (number|Long|null);

        /** EventLog log */
        log?: (string|null);
    }

    /** Represents an EventLog. */
    class EventLog implements IEventLog {

        /**
         * Constructs a new EventLog.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IEventLog);

        /** EventLog eventId. */
        public eventId: pb.EventId;

        /** EventLog uid. */
        public uid: number;

        /** EventLog ts. */
        public ts: (number|Long);

        /** EventLog log. */
        public log: string;

        /**
         * Creates a new EventLog instance using the specified properties.
         * @param [properties] Properties to set
         * @returns EventLog instance
         */
        public static create(properties?: pb.IEventLog): pb.EventLog;

        /**
         * Encodes the specified EventLog message. Does not implicitly {@link pb.EventLog.verify|verify} messages.
         * @param message EventLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IEventLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified EventLog message, length delimited. Does not implicitly {@link pb.EventLog.verify|verify} messages.
         * @param message EventLog message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IEventLog, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an EventLog message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns EventLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.EventLog;

        /**
         * Decodes an EventLog message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns EventLog
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.EventLog;

        /**
         * Verifies an EventLog message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an EventLog message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns EventLog
         */
        public static fromObject(object: { [k: string]: any }): pb.EventLog;

        /**
         * Creates a plain object from an EventLog message. Also converts values to other types if specified.
         * @param message EventLog
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.EventLog, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this EventLog to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Events. */
    interface IEvents {

        /** Events items */
        items?: (pb.IEventLog[]|null);
    }

    /** Represents an Events. */
    class Events implements IEvents {

        /**
         * Constructs a new Events.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IEvents);

        /** Events items. */
        public items: pb.IEventLog[];

        /**
         * Creates a new Events instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Events instance
         */
        public static create(properties?: pb.IEvents): pb.Events;

        /**
         * Encodes the specified Events message. Does not implicitly {@link pb.Events.verify|verify} messages.
         * @param message Events message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IEvents, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Events message, length delimited. Does not implicitly {@link pb.Events.verify|verify} messages.
         * @param message Events message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IEvents, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Events message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Events
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Events;

        /**
         * Decodes an Events message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Events
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Events;

        /**
         * Verifies an Events message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Events message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Events
         */
        public static fromObject(object: { [k: string]: any }): pb.Events;

        /**
         * Creates a plain object from an Events message. Also converts values to other types if specified.
         * @param message Events
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Events, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Events to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ItemOrder. */
    interface IItemOrder {

        /** ItemOrder itemId */
        itemId?: (number|null);

        /** ItemOrder activityId */
        activityId?: (number|null);

        /** ItemOrder count */
        count?: (number|null);

        /** ItemOrder from */
        from?: (pb.AppFrom|null);
    }

    /** Represents an ItemOrder. */
    class ItemOrder implements IItemOrder {

        /**
         * Constructs a new ItemOrder.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IItemOrder);

        /** ItemOrder itemId. */
        public itemId: number;

        /** ItemOrder activityId. */
        public activityId: number;

        /** ItemOrder count. */
        public count: number;

        /** ItemOrder from. */
        public from: pb.AppFrom;

        /**
         * Creates a new ItemOrder instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ItemOrder instance
         */
        public static create(properties?: pb.IItemOrder): pb.ItemOrder;

        /**
         * Encodes the specified ItemOrder message. Does not implicitly {@link pb.ItemOrder.verify|verify} messages.
         * @param message ItemOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IItemOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ItemOrder message, length delimited. Does not implicitly {@link pb.ItemOrder.verify|verify} messages.
         * @param message ItemOrder message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IItemOrder, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ItemOrder message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ItemOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ItemOrder;

        /**
         * Decodes an ItemOrder message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ItemOrder
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ItemOrder;

        /**
         * Verifies an ItemOrder message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ItemOrder message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ItemOrder
         */
        public static fromObject(object: { [k: string]: any }): pb.ItemOrder;

        /**
         * Creates a plain object from an ItemOrder message. Also converts values to other types if specified.
         * @param message ItemOrder
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ItemOrder, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ItemOrder to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdShopOrderReply. */
    interface ICmdShopOrderReply {

        /** CmdShopOrderReply result */
        result?: (pb.IErrorInfo|null);

        /** CmdShopOrderReply orderId */
        orderId?: (number|Long|null);

        /** CmdShopOrderReply wxXml */
        wxXml?: (string|null);

        /** CmdShopOrderReply payType */
        payType?: (pb.PaymentType|null);
    }

    /** Represents a CmdShopOrderReply. */
    class CmdShopOrderReply implements ICmdShopOrderReply {

        /**
         * Constructs a new CmdShopOrderReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdShopOrderReply);

        /** CmdShopOrderReply result. */
        public result?: (pb.IErrorInfo|null);

        /** CmdShopOrderReply orderId. */
        public orderId: (number|Long);

        /** CmdShopOrderReply wxXml. */
        public wxXml: string;

        /** CmdShopOrderReply payType. */
        public payType: pb.PaymentType;

        /**
         * Creates a new CmdShopOrderReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdShopOrderReply instance
         */
        public static create(properties?: pb.ICmdShopOrderReply): pb.CmdShopOrderReply;

        /**
         * Encodes the specified CmdShopOrderReply message. Does not implicitly {@link pb.CmdShopOrderReply.verify|verify} messages.
         * @param message CmdShopOrderReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdShopOrderReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdShopOrderReply message, length delimited. Does not implicitly {@link pb.CmdShopOrderReply.verify|verify} messages.
         * @param message CmdShopOrderReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdShopOrderReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdShopOrderReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdShopOrderReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdShopOrderReply;

        /**
         * Decodes a CmdShopOrderReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdShopOrderReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdShopOrderReply;

        /**
         * Verifies a CmdShopOrderReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdShopOrderReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdShopOrderReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdShopOrderReply;

        /**
         * Creates a plain object from a CmdShopOrderReply message. Also converts values to other types if specified.
         * @param message CmdShopOrderReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdShopOrderReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdShopOrderReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdShopOrderQuery. */
    interface ICmdShopOrderQuery {

        /** CmdShopOrderQuery uid */
        uid?: (number|null);

        /** CmdShopOrderQuery orderId */
        orderId?: (number|Long|null);

        /** CmdShopOrderQuery from */
        from?: (pb.AppFrom|null);

        /** CmdShopOrderQuery wxResult */
        wxResult?: (string|null);
    }

    /** Represents a CmdShopOrderQuery. */
    class CmdShopOrderQuery implements ICmdShopOrderQuery {

        /**
         * Constructs a new CmdShopOrderQuery.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdShopOrderQuery);

        /** CmdShopOrderQuery uid. */
        public uid: number;

        /** CmdShopOrderQuery orderId. */
        public orderId: (number|Long);

        /** CmdShopOrderQuery from. */
        public from: pb.AppFrom;

        /** CmdShopOrderQuery wxResult. */
        public wxResult: string;

        /**
         * Creates a new CmdShopOrderQuery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdShopOrderQuery instance
         */
        public static create(properties?: pb.ICmdShopOrderQuery): pb.CmdShopOrderQuery;

        /**
         * Encodes the specified CmdShopOrderQuery message. Does not implicitly {@link pb.CmdShopOrderQuery.verify|verify} messages.
         * @param message CmdShopOrderQuery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdShopOrderQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdShopOrderQuery message, length delimited. Does not implicitly {@link pb.CmdShopOrderQuery.verify|verify} messages.
         * @param message CmdShopOrderQuery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdShopOrderQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdShopOrderQuery message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdShopOrderQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdShopOrderQuery;

        /**
         * Decodes a CmdShopOrderQuery message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdShopOrderQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdShopOrderQuery;

        /**
         * Verifies a CmdShopOrderQuery message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdShopOrderQuery message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdShopOrderQuery
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdShopOrderQuery;

        /**
         * Creates a plain object from a CmdShopOrderQuery message. Also converts values to other types if specified.
         * @param message CmdShopOrderQuery
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdShopOrderQuery, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdShopOrderQuery to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdMobileBind. */
    interface ICmdMobileBind {

        /** CmdMobileBind mobile */
        mobile?: (string|null);

        /** CmdMobileBind smsCode */
        smsCode?: (string|null);
    }

    /** Represents a CmdMobileBind. */
    class CmdMobileBind implements ICmdMobileBind {

        /**
         * Constructs a new CmdMobileBind.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdMobileBind);

        /** CmdMobileBind mobile. */
        public mobile: string;

        /** CmdMobileBind smsCode. */
        public smsCode: string;

        /**
         * Creates a new CmdMobileBind instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdMobileBind instance
         */
        public static create(properties?: pb.ICmdMobileBind): pb.CmdMobileBind;

        /**
         * Encodes the specified CmdMobileBind message. Does not implicitly {@link pb.CmdMobileBind.verify|verify} messages.
         * @param message CmdMobileBind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdMobileBind, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdMobileBind message, length delimited. Does not implicitly {@link pb.CmdMobileBind.verify|verify} messages.
         * @param message CmdMobileBind message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdMobileBind, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdMobileBind message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdMobileBind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdMobileBind;

        /**
         * Decodes a CmdMobileBind message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdMobileBind
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdMobileBind;

        /**
         * Verifies a CmdMobileBind message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdMobileBind message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdMobileBind
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdMobileBind;

        /**
         * Creates a plain object from a CmdMobileBind message. Also converts values to other types if specified.
         * @param message CmdMobileBind
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdMobileBind, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdMobileBind to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActivityItem. */
    interface IActivityItem {

        /** ActivityItem id */
        id?: (number|null);

        /** ActivityItem title */
        title?: (string|null);

        /** ActivityItem icon */
        icon?: (string|null);

        /** ActivityItem image */
        image?: (string|null);

        /** ActivityItem from */
        from?: (number|Long|null);

        /** ActivityItem to */
        to?: (number|Long|null);

        /** ActivityItem itemId */
        itemId?: (number|null);
    }

    /** Represents an ActivityItem. */
    class ActivityItem implements IActivityItem {

        /**
         * Constructs a new ActivityItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IActivityItem);

        /** ActivityItem id. */
        public id: number;

        /** ActivityItem title. */
        public title: string;

        /** ActivityItem icon. */
        public icon: string;

        /** ActivityItem image. */
        public image: string;

        /** ActivityItem from. */
        public from: (number|Long);

        /** ActivityItem to. */
        public to: (number|Long);

        /** ActivityItem itemId. */
        public itemId: number;

        /**
         * Creates a new ActivityItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActivityItem instance
         */
        public static create(properties?: pb.IActivityItem): pb.ActivityItem;

        /**
         * Encodes the specified ActivityItem message. Does not implicitly {@link pb.ActivityItem.verify|verify} messages.
         * @param message ActivityItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IActivityItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActivityItem message, length delimited. Does not implicitly {@link pb.ActivityItem.verify|verify} messages.
         * @param message ActivityItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IActivityItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActivityItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActivityItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ActivityItem;

        /**
         * Decodes an ActivityItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActivityItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ActivityItem;

        /**
         * Verifies an ActivityItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActivityItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActivityItem
         */
        public static fromObject(object: { [k: string]: any }): pb.ActivityItem;

        /**
         * Creates a plain object from an ActivityItem message. Also converts values to other types if specified.
         * @param message ActivityItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ActivityItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActivityItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActivityConf. */
    interface IActivityConf {

        /** ActivityConf items */
        items?: (pb.IActivityItem[]|null);
    }

    /** Represents an ActivityConf. */
    class ActivityConf implements IActivityConf {

        /**
         * Constructs a new ActivityConf.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IActivityConf);

        /** ActivityConf items. */
        public items: pb.IActivityItem[];

        /**
         * Creates a new ActivityConf instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActivityConf instance
         */
        public static create(properties?: pb.IActivityConf): pb.ActivityConf;

        /**
         * Encodes the specified ActivityConf message. Does not implicitly {@link pb.ActivityConf.verify|verify} messages.
         * @param message ActivityConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IActivityConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActivityConf message, length delimited. Does not implicitly {@link pb.ActivityConf.verify|verify} messages.
         * @param message ActivityConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IActivityConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActivityConf message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActivityConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ActivityConf;

        /**
         * Decodes an ActivityConf message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActivityConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ActivityConf;

        /**
         * Verifies an ActivityConf message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActivityConf message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActivityConf
         */
        public static fromObject(object: { [k: string]: any }): pb.ActivityConf;

        /**
         * Creates a plain object from an ActivityConf message. Also converts values to other types if specified.
         * @param message ActivityConf
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ActivityConf, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActivityConf to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an ActivityLogs. */
    interface IActivityLogs {

        /** ActivityLogs ids */
        ids?: (number[]|null);
    }

    /** Represents an ActivityLogs. */
    class ActivityLogs implements IActivityLogs {

        /**
         * Constructs a new ActivityLogs.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IActivityLogs);

        /** ActivityLogs ids. */
        public ids: number[];

        /**
         * Creates a new ActivityLogs instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ActivityLogs instance
         */
        public static create(properties?: pb.IActivityLogs): pb.ActivityLogs;

        /**
         * Encodes the specified ActivityLogs message. Does not implicitly {@link pb.ActivityLogs.verify|verify} messages.
         * @param message ActivityLogs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IActivityLogs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ActivityLogs message, length delimited. Does not implicitly {@link pb.ActivityLogs.verify|verify} messages.
         * @param message ActivityLogs message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IActivityLogs, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an ActivityLogs message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ActivityLogs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ActivityLogs;

        /**
         * Decodes an ActivityLogs message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ActivityLogs
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ActivityLogs;

        /**
         * Verifies an ActivityLogs message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an ActivityLogs message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ActivityLogs
         */
        public static fromObject(object: { [k: string]: any }): pb.ActivityLogs;

        /**
         * Creates a plain object from an ActivityLogs message. Also converts values to other types if specified.
         * @param message ActivityLogs
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ActivityLogs, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ActivityLogs to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGoldAwardPrompt. */
    interface ICmdGoldAwardPrompt {

        /** CmdGoldAwardPrompt text */
        text?: (string|null);

        /** CmdGoldAwardPrompt gold */
        gold?: (number|null);
    }

    /** Represents a CmdGoldAwardPrompt. */
    class CmdGoldAwardPrompt implements ICmdGoldAwardPrompt {

        /**
         * Constructs a new CmdGoldAwardPrompt.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGoldAwardPrompt);

        /** CmdGoldAwardPrompt text. */
        public text: string;

        /** CmdGoldAwardPrompt gold. */
        public gold: number;

        /**
         * Creates a new CmdGoldAwardPrompt instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGoldAwardPrompt instance
         */
        public static create(properties?: pb.ICmdGoldAwardPrompt): pb.CmdGoldAwardPrompt;

        /**
         * Encodes the specified CmdGoldAwardPrompt message. Does not implicitly {@link pb.CmdGoldAwardPrompt.verify|verify} messages.
         * @param message CmdGoldAwardPrompt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGoldAwardPrompt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGoldAwardPrompt message, length delimited. Does not implicitly {@link pb.CmdGoldAwardPrompt.verify|verify} messages.
         * @param message CmdGoldAwardPrompt message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGoldAwardPrompt, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGoldAwardPrompt message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGoldAwardPrompt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGoldAwardPrompt;

        /**
         * Decodes a CmdGoldAwardPrompt message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGoldAwardPrompt
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGoldAwardPrompt;

        /**
         * Verifies a CmdGoldAwardPrompt message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGoldAwardPrompt message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGoldAwardPrompt
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGoldAwardPrompt;

        /**
         * Creates a plain object from a CmdGoldAwardPrompt message. Also converts values to other types if specified.
         * @param message CmdGoldAwardPrompt
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGoldAwardPrompt, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGoldAwardPrompt to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdExchange. */
    interface ICmdExchange {

        /** CmdExchange type */
        type?: (pb.ExchangeType|null);

        /** CmdExchange amount */
        amount?: (number|Long|null);

        /** CmdExchange uid */
        uid?: (number|Long|null);
    }

    /** Represents a CmdExchange. */
    class CmdExchange implements ICmdExchange {

        /**
         * Constructs a new CmdExchange.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdExchange);

        /** CmdExchange type. */
        public type: pb.ExchangeType;

        /** CmdExchange amount. */
        public amount: (number|Long);

        /** CmdExchange uid. */
        public uid: (number|Long);

        /**
         * Creates a new CmdExchange instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdExchange instance
         */
        public static create(properties?: pb.ICmdExchange): pb.CmdExchange;

        /**
         * Encodes the specified CmdExchange message. Does not implicitly {@link pb.CmdExchange.verify|verify} messages.
         * @param message CmdExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdExchange message, length delimited. Does not implicitly {@link pb.CmdExchange.verify|verify} messages.
         * @param message CmdExchange message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdExchange, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdExchange message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdExchange;

        /**
         * Decodes a CmdExchange message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdExchange
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdExchange;

        /**
         * Verifies a CmdExchange message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdExchange message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdExchange
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdExchange;

        /**
         * Creates a plain object from a CmdExchange message. Also converts values to other types if specified.
         * @param message CmdExchange
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdExchange, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdExchange to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** KType enum. */
    enum KType {
        KType_NULL = 0,
        Real = 1,
        Min = 2,
        MinToday = 3,
        Min5 = 4,
        Min15 = 5,
        Min30 = 6,
        Min60 = 7,
        Day = 10,
        Day7 = 11,
        Day30 = 12
    }

    /** KStyle enum. */
    enum KStyle {
        Random = 0,
        Wave = 1,
        Up = 2,
        Down = 3
    }

    /** Properties of a CmdQuoteQuery. */
    interface ICmdQuoteQuery {

        /** CmdQuoteQuery ktype */
        ktype?: (pb.KType|null);

        /** CmdQuoteQuery code */
        code?: (number|null);

        /** CmdQuoteQuery from */
        from?: (number|Long|null);

        /** CmdQuoteQuery total */
        total?: (number|null);

        /** CmdQuoteQuery to */
        to?: (number|Long|null);

        /** CmdQuoteQuery kstyle */
        kstyle?: (pb.KStyle|null);

        /** CmdQuoteQuery reserve */
        reserve?: (number|null);
    }

    /** Represents a CmdQuoteQuery. */
    class CmdQuoteQuery implements ICmdQuoteQuery {

        /**
         * Constructs a new CmdQuoteQuery.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQuoteQuery);

        /** CmdQuoteQuery ktype. */
        public ktype: pb.KType;

        /** CmdQuoteQuery code. */
        public code: number;

        /** CmdQuoteQuery from. */
        public from: (number|Long);

        /** CmdQuoteQuery total. */
        public total: number;

        /** CmdQuoteQuery to. */
        public to: (number|Long);

        /** CmdQuoteQuery kstyle. */
        public kstyle: pb.KStyle;

        /** CmdQuoteQuery reserve. */
        public reserve: number;

        /**
         * Creates a new CmdQuoteQuery instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQuoteQuery instance
         */
        public static create(properties?: pb.ICmdQuoteQuery): pb.CmdQuoteQuery;

        /**
         * Encodes the specified CmdQuoteQuery message. Does not implicitly {@link pb.CmdQuoteQuery.verify|verify} messages.
         * @param message CmdQuoteQuery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQuoteQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQuoteQuery message, length delimited. Does not implicitly {@link pb.CmdQuoteQuery.verify|verify} messages.
         * @param message CmdQuoteQuery message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQuoteQuery, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQuoteQuery message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQuoteQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQuoteQuery;

        /**
         * Decodes a CmdQuoteQuery message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQuoteQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQuoteQuery;

        /**
         * Verifies a CmdQuoteQuery message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQuoteQuery message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQuoteQuery
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQuoteQuery;

        /**
         * Creates a plain object from a CmdQuoteQuery message. Also converts values to other types if specified.
         * @param message CmdQuoteQuery
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQuoteQuery, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQuoteQuery to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a QuoteItem. */
    interface IQuoteItem {

        /** QuoteItem code */
        code?: (number|null);

        /** QuoteItem ktype */
        ktype?: (pb.KType|null);

        /** QuoteItem timestamp */
        timestamp?: (number|Long|null);

        /** QuoteItem price */
        price?: (number|null);

        /** QuoteItem volume */
        volume?: (number|Long|null);

        /** QuoteItem amount */
        amount?: (number|null);

        /** QuoteItem count */
        count?: (number|Long|null);

        /** QuoteItem open */
        open?: (number|null);

        /** QuoteItem close */
        close?: (number|null);

        /** QuoteItem high */
        high?: (number|null);

        /** QuoteItem low */
        low?: (number|null);

        /** QuoteItem ask5Price */
        ask5Price?: (number[]|null);

        /** QuoteItem ask5Volume */
        ask5Volume?: ((number|Long)[]|null);

        /** QuoteItem bid5Price */
        bid5Price?: (number[]|null);

        /** QuoteItem bid5Volume */
        bid5Volume?: ((number|Long)[]|null);
    }

    /** Represents a QuoteItem. */
    class QuoteItem implements IQuoteItem {

        /**
         * Constructs a new QuoteItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IQuoteItem);

        /** QuoteItem code. */
        public code: number;

        /** QuoteItem ktype. */
        public ktype: pb.KType;

        /** QuoteItem timestamp. */
        public timestamp: (number|Long);

        /** QuoteItem price. */
        public price: number;

        /** QuoteItem volume. */
        public volume: (number|Long);

        /** QuoteItem amount. */
        public amount: number;

        /** QuoteItem count. */
        public count: (number|Long);

        /** QuoteItem open. */
        public open: number;

        /** QuoteItem close. */
        public close: number;

        /** QuoteItem high. */
        public high: number;

        /** QuoteItem low. */
        public low: number;

        /** QuoteItem ask5Price. */
        public ask5Price: number[];

        /** QuoteItem ask5Volume. */
        public ask5Volume: (number|Long)[];

        /** QuoteItem bid5Price. */
        public bid5Price: number[];

        /** QuoteItem bid5Volume. */
        public bid5Volume: (number|Long)[];

        /**
         * Creates a new QuoteItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuoteItem instance
         */
        public static create(properties?: pb.IQuoteItem): pb.QuoteItem;

        /**
         * Encodes the specified QuoteItem message. Does not implicitly {@link pb.QuoteItem.verify|verify} messages.
         * @param message QuoteItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IQuoteItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuoteItem message, length delimited. Does not implicitly {@link pb.QuoteItem.verify|verify} messages.
         * @param message QuoteItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IQuoteItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuoteItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QuoteItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.QuoteItem;

        /**
         * Decodes a QuoteItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QuoteItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.QuoteItem;

        /**
         * Verifies a QuoteItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuoteItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuoteItem
         */
        public static fromObject(object: { [k: string]: any }): pb.QuoteItem;

        /**
         * Creates a plain object from a QuoteItem message. Also converts values to other types if specified.
         * @param message QuoteItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.QuoteItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuoteItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Quotes. */
    interface IQuotes {

        /** Quotes items */
        items?: (pb.IQuoteItem[]|null);
    }

    /** Represents a Quotes. */
    class Quotes implements IQuotes {

        /**
         * Constructs a new Quotes.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IQuotes);

        /** Quotes items. */
        public items: pb.IQuoteItem[];

        /**
         * Creates a new Quotes instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Quotes instance
         */
        public static create(properties?: pb.IQuotes): pb.Quotes;

        /**
         * Encodes the specified Quotes message. Does not implicitly {@link pb.Quotes.verify|verify} messages.
         * @param message Quotes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IQuotes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Quotes message, length delimited. Does not implicitly {@link pb.Quotes.verify|verify} messages.
         * @param message Quotes message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IQuotes, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Quotes message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Quotes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Quotes;

        /**
         * Decodes a Quotes message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Quotes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Quotes;

        /**
         * Verifies a Quotes message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Quotes message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Quotes
         */
        public static fromObject(object: { [k: string]: any }): pb.Quotes;

        /**
         * Creates a plain object from a Quotes message. Also converts values to other types if specified.
         * @param message Quotes
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Quotes, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Quotes to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a QuoteSubscribeItem. */
    interface IQuoteSubscribeItem {

        /** QuoteSubscribeItem code */
        code?: (string|null);

        /** QuoteSubscribeItem flag */
        flag?: (boolean|null);
    }

    /** Represents a QuoteSubscribeItem. */
    class QuoteSubscribeItem implements IQuoteSubscribeItem {

        /**
         * Constructs a new QuoteSubscribeItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IQuoteSubscribeItem);

        /** QuoteSubscribeItem code. */
        public code: string;

        /** QuoteSubscribeItem flag. */
        public flag: boolean;

        /**
         * Creates a new QuoteSubscribeItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuoteSubscribeItem instance
         */
        public static create(properties?: pb.IQuoteSubscribeItem): pb.QuoteSubscribeItem;

        /**
         * Encodes the specified QuoteSubscribeItem message. Does not implicitly {@link pb.QuoteSubscribeItem.verify|verify} messages.
         * @param message QuoteSubscribeItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IQuoteSubscribeItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuoteSubscribeItem message, length delimited. Does not implicitly {@link pb.QuoteSubscribeItem.verify|verify} messages.
         * @param message QuoteSubscribeItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IQuoteSubscribeItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuoteSubscribeItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QuoteSubscribeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.QuoteSubscribeItem;

        /**
         * Decodes a QuoteSubscribeItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QuoteSubscribeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.QuoteSubscribeItem;

        /**
         * Verifies a QuoteSubscribeItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuoteSubscribeItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuoteSubscribeItem
         */
        public static fromObject(object: { [k: string]: any }): pb.QuoteSubscribeItem;

        /**
         * Creates a plain object from a QuoteSubscribeItem message. Also converts values to other types if specified.
         * @param message QuoteSubscribeItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.QuoteSubscribeItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuoteSubscribeItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQuoteSubscribe. */
    interface ICmdQuoteSubscribe {

        /** CmdQuoteSubscribe items */
        items?: (pb.IQuoteSubscribeItem[]|null);
    }

    /** Represents a CmdQuoteSubscribe. */
    class CmdQuoteSubscribe implements ICmdQuoteSubscribe {

        /**
         * Constructs a new CmdQuoteSubscribe.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQuoteSubscribe);

        /** CmdQuoteSubscribe items. */
        public items: pb.IQuoteSubscribeItem[];

        /**
         * Creates a new CmdQuoteSubscribe instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQuoteSubscribe instance
         */
        public static create(properties?: pb.ICmdQuoteSubscribe): pb.CmdQuoteSubscribe;

        /**
         * Encodes the specified CmdQuoteSubscribe message. Does not implicitly {@link pb.CmdQuoteSubscribe.verify|verify} messages.
         * @param message CmdQuoteSubscribe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQuoteSubscribe, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQuoteSubscribe message, length delimited. Does not implicitly {@link pb.CmdQuoteSubscribe.verify|verify} messages.
         * @param message CmdQuoteSubscribe message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQuoteSubscribe, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQuoteSubscribe message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQuoteSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQuoteSubscribe;

        /**
         * Decodes a CmdQuoteSubscribe message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQuoteSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQuoteSubscribe;

        /**
         * Verifies a CmdQuoteSubscribe message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQuoteSubscribe message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQuoteSubscribe
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQuoteSubscribe;

        /**
         * Creates a plain object from a CmdQuoteSubscribe message. Also converts values to other types if specified.
         * @param message CmdQuoteSubscribe
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQuoteSubscribe, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQuoteSubscribe to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdTradingDay. */
    interface ICmdTradingDay {

        /** CmdTradingDay date */
        date?: (number|null);

        /** CmdTradingDay n */
        n?: (number|null);
    }

    /** Represents a CmdTradingDay. */
    class CmdTradingDay implements ICmdTradingDay {

        /**
         * Constructs a new CmdTradingDay.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdTradingDay);

        /** CmdTradingDay date. */
        public date: number;

        /** CmdTradingDay n. */
        public n: number;

        /**
         * Creates a new CmdTradingDay instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdTradingDay instance
         */
        public static create(properties?: pb.ICmdTradingDay): pb.CmdTradingDay;

        /**
         * Encodes the specified CmdTradingDay message. Does not implicitly {@link pb.CmdTradingDay.verify|verify} messages.
         * @param message CmdTradingDay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdTradingDay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdTradingDay message, length delimited. Does not implicitly {@link pb.CmdTradingDay.verify|verify} messages.
         * @param message CmdTradingDay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdTradingDay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdTradingDay message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdTradingDay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdTradingDay;

        /**
         * Decodes a CmdTradingDay message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdTradingDay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdTradingDay;

        /**
         * Verifies a CmdTradingDay message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdTradingDay message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdTradingDay
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdTradingDay;

        /**
         * Creates a plain object from a CmdTradingDay message. Also converts values to other types if specified.
         * @param message CmdTradingDay
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdTradingDay, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdTradingDay to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdTradingDayReply. */
    interface ICmdTradingDayReply {

        /** CmdTradingDayReply isTradingDay */
        isTradingDay?: (boolean|null);

        /** CmdTradingDayReply days */
        days?: (number[]|null);
    }

    /** Represents a CmdTradingDayReply. */
    class CmdTradingDayReply implements ICmdTradingDayReply {

        /**
         * Constructs a new CmdTradingDayReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdTradingDayReply);

        /** CmdTradingDayReply isTradingDay. */
        public isTradingDay: boolean;

        /** CmdTradingDayReply days. */
        public days: number[];

        /**
         * Creates a new CmdTradingDayReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdTradingDayReply instance
         */
        public static create(properties?: pb.ICmdTradingDayReply): pb.CmdTradingDayReply;

        /**
         * Encodes the specified CmdTradingDayReply message. Does not implicitly {@link pb.CmdTradingDayReply.verify|verify} messages.
         * @param message CmdTradingDayReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdTradingDayReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdTradingDayReply message, length delimited. Does not implicitly {@link pb.CmdTradingDayReply.verify|verify} messages.
         * @param message CmdTradingDayReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdTradingDayReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdTradingDayReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdTradingDayReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdTradingDayReply;

        /**
         * Decodes a CmdTradingDayReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdTradingDayReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdTradingDayReply;

        /**
         * Verifies a CmdTradingDayReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdTradingDayReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdTradingDayReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdTradingDayReply;

        /**
         * Creates a plain object from a CmdTradingDayReply message. Also converts values to other types if specified.
         * @param message CmdTradingDayReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdTradingDayReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdTradingDayReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRecommendStock. */
    interface ICmdRecommendStock {

        /** CmdRecommendStock from */
        from?: (number|Long|null);

        /** CmdRecommendStock total */
        total?: (number|null);

        /** CmdRecommendStock to */
        to?: (number|Long|null);
    }

    /** Represents a CmdRecommendStock. */
    class CmdRecommendStock implements ICmdRecommendStock {

        /**
         * Constructs a new CmdRecommendStock.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRecommendStock);

        /** CmdRecommendStock from. */
        public from: (number|Long);

        /** CmdRecommendStock total. */
        public total: number;

        /** CmdRecommendStock to. */
        public to: (number|Long);

        /**
         * Creates a new CmdRecommendStock instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRecommendStock instance
         */
        public static create(properties?: pb.ICmdRecommendStock): pb.CmdRecommendStock;

        /**
         * Encodes the specified CmdRecommendStock message. Does not implicitly {@link pb.CmdRecommendStock.verify|verify} messages.
         * @param message CmdRecommendStock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRecommendStock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRecommendStock message, length delimited. Does not implicitly {@link pb.CmdRecommendStock.verify|verify} messages.
         * @param message CmdRecommendStock message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRecommendStock, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRecommendStock message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRecommendStock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRecommendStock;

        /**
         * Decodes a CmdRecommendStock message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRecommendStock
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRecommendStock;

        /**
         * Verifies a CmdRecommendStock message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRecommendStock message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRecommendStock
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRecommendStock;

        /**
         * Creates a plain object from a CmdRecommendStock message. Also converts values to other types if specified.
         * @param message CmdRecommendStock
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRecommendStock, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRecommendStock to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RecommendStockItem. */
    interface IRecommendStockItem {

        /** RecommendStockItem ts */
        ts?: (number|Long|null);

        /** RecommendStockItem codeList */
        codeList?: (number[]|null);
    }

    /** Represents a RecommendStockItem. */
    class RecommendStockItem implements IRecommendStockItem {

        /**
         * Constructs a new RecommendStockItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRecommendStockItem);

        /** RecommendStockItem ts. */
        public ts: (number|Long);

        /** RecommendStockItem codeList. */
        public codeList: number[];

        /**
         * Creates a new RecommendStockItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RecommendStockItem instance
         */
        public static create(properties?: pb.IRecommendStockItem): pb.RecommendStockItem;

        /**
         * Encodes the specified RecommendStockItem message. Does not implicitly {@link pb.RecommendStockItem.verify|verify} messages.
         * @param message RecommendStockItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRecommendStockItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RecommendStockItem message, length delimited. Does not implicitly {@link pb.RecommendStockItem.verify|verify} messages.
         * @param message RecommendStockItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRecommendStockItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RecommendStockItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RecommendStockItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RecommendStockItem;

        /**
         * Decodes a RecommendStockItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RecommendStockItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RecommendStockItem;

        /**
         * Verifies a RecommendStockItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RecommendStockItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RecommendStockItem
         */
        public static fromObject(object: { [k: string]: any }): pb.RecommendStockItem;

        /**
         * Creates a plain object from a RecommendStockItem message. Also converts values to other types if specified.
         * @param message RecommendStockItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RecommendStockItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RecommendStockItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRecommendStockReply. */
    interface ICmdRecommendStockReply {

        /** CmdRecommendStockReply items */
        items?: (pb.IRecommendStockItem[]|null);
    }

    /** Represents a CmdRecommendStockReply. */
    class CmdRecommendStockReply implements ICmdRecommendStockReply {

        /**
         * Constructs a new CmdRecommendStockReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRecommendStockReply);

        /** CmdRecommendStockReply items. */
        public items: pb.IRecommendStockItem[];

        /**
         * Creates a new CmdRecommendStockReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRecommendStockReply instance
         */
        public static create(properties?: pb.ICmdRecommendStockReply): pb.CmdRecommendStockReply;

        /**
         * Encodes the specified CmdRecommendStockReply message. Does not implicitly {@link pb.CmdRecommendStockReply.verify|verify} messages.
         * @param message CmdRecommendStockReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRecommendStockReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRecommendStockReply message, length delimited. Does not implicitly {@link pb.CmdRecommendStockReply.verify|verify} messages.
         * @param message CmdRecommendStockReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRecommendStockReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRecommendStockReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRecommendStockReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRecommendStockReply;

        /**
         * Decodes a CmdRecommendStockReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRecommendStockReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRecommendStockReply;

        /**
         * Verifies a CmdRecommendStockReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRecommendStockReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRecommendStockReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRecommendStockReply;

        /**
         * Creates a plain object from a CmdRecommendStockReply message. Also converts values to other types if specified.
         * @param message CmdRecommendStockReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRecommendStockReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRecommendStockReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQuoteQueryFuture. */
    interface ICmdQuoteQueryFuture {

        /** CmdQuoteQueryFuture ktype */
        ktype?: (pb.KType|null);

        /** CmdQuoteQueryFuture code */
        code?: (number|null);

        /** CmdQuoteQueryFuture from */
        from?: (number|Long|null);

        /** CmdQuoteQueryFuture total */
        total?: (number|null);

        /** CmdQuoteQueryFuture to */
        to?: (number|Long|null);

        /** CmdQuoteQueryFuture reserve */
        reserve?: (number|null);
    }

    /** Represents a CmdQuoteQueryFuture. */
    class CmdQuoteQueryFuture implements ICmdQuoteQueryFuture {

        /**
         * Constructs a new CmdQuoteQueryFuture.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQuoteQueryFuture);

        /** CmdQuoteQueryFuture ktype. */
        public ktype: pb.KType;

        /** CmdQuoteQueryFuture code. */
        public code: number;

        /** CmdQuoteQueryFuture from. */
        public from: (number|Long);

        /** CmdQuoteQueryFuture total. */
        public total: number;

        /** CmdQuoteQueryFuture to. */
        public to: (number|Long);

        /** CmdQuoteQueryFuture reserve. */
        public reserve: number;

        /**
         * Creates a new CmdQuoteQueryFuture instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQuoteQueryFuture instance
         */
        public static create(properties?: pb.ICmdQuoteQueryFuture): pb.CmdQuoteQueryFuture;

        /**
         * Encodes the specified CmdQuoteQueryFuture message. Does not implicitly {@link pb.CmdQuoteQueryFuture.verify|verify} messages.
         * @param message CmdQuoteQueryFuture message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQuoteQueryFuture, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQuoteQueryFuture message, length delimited. Does not implicitly {@link pb.CmdQuoteQueryFuture.verify|verify} messages.
         * @param message CmdQuoteQueryFuture message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQuoteQueryFuture, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQuoteQueryFuture message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQuoteQueryFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQuoteQueryFuture;

        /**
         * Decodes a CmdQuoteQueryFuture message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQuoteQueryFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQuoteQueryFuture;

        /**
         * Verifies a CmdQuoteQueryFuture message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQuoteQueryFuture message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQuoteQueryFuture
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQuoteQueryFuture;

        /**
         * Creates a plain object from a CmdQuoteQueryFuture message. Also converts values to other types if specified.
         * @param message CmdQuoteQueryFuture
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQuoteQueryFuture, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQuoteQueryFuture to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a QuoteItemFuture. */
    interface IQuoteItemFuture {

        /** QuoteItemFuture code */
        code?: (number|null);

        /** QuoteItemFuture ktype */
        ktype?: (pb.KType|null);

        /** QuoteItemFuture timestamp */
        timestamp?: (number|Long|null);

        /** QuoteItemFuture open */
        open?: (number|null);

        /** QuoteItemFuture close */
        close?: (number|null);

        /** QuoteItemFuture high */
        high?: (number|null);

        /** QuoteItemFuture low */
        low?: (number|null);

        /** QuoteItemFuture volume */
        volume?: (number|Long|null);

        /** QuoteItemFuture cclHold */
        cclHold?: (number|Long|null);
    }

    /** Represents a QuoteItemFuture. */
    class QuoteItemFuture implements IQuoteItemFuture {

        /**
         * Constructs a new QuoteItemFuture.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IQuoteItemFuture);

        /** QuoteItemFuture code. */
        public code: number;

        /** QuoteItemFuture ktype. */
        public ktype: pb.KType;

        /** QuoteItemFuture timestamp. */
        public timestamp: (number|Long);

        /** QuoteItemFuture open. */
        public open: number;

        /** QuoteItemFuture close. */
        public close: number;

        /** QuoteItemFuture high. */
        public high: number;

        /** QuoteItemFuture low. */
        public low: number;

        /** QuoteItemFuture volume. */
        public volume: (number|Long);

        /** QuoteItemFuture cclHold. */
        public cclHold: (number|Long);

        /**
         * Creates a new QuoteItemFuture instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuoteItemFuture instance
         */
        public static create(properties?: pb.IQuoteItemFuture): pb.QuoteItemFuture;

        /**
         * Encodes the specified QuoteItemFuture message. Does not implicitly {@link pb.QuoteItemFuture.verify|verify} messages.
         * @param message QuoteItemFuture message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IQuoteItemFuture, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuoteItemFuture message, length delimited. Does not implicitly {@link pb.QuoteItemFuture.verify|verify} messages.
         * @param message QuoteItemFuture message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IQuoteItemFuture, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuoteItemFuture message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QuoteItemFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.QuoteItemFuture;

        /**
         * Decodes a QuoteItemFuture message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QuoteItemFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.QuoteItemFuture;

        /**
         * Verifies a QuoteItemFuture message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuoteItemFuture message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuoteItemFuture
         */
        public static fromObject(object: { [k: string]: any }): pb.QuoteItemFuture;

        /**
         * Creates a plain object from a QuoteItemFuture message. Also converts values to other types if specified.
         * @param message QuoteItemFuture
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.QuoteItemFuture, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuoteItemFuture to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a QuotesFuture. */
    interface IQuotesFuture {

        /** QuotesFuture items */
        items?: (pb.IQuoteItemFuture[]|null);
    }

    /** Represents a QuotesFuture. */
    class QuotesFuture implements IQuotesFuture {

        /**
         * Constructs a new QuotesFuture.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IQuotesFuture);

        /** QuotesFuture items. */
        public items: pb.IQuoteItemFuture[];

        /**
         * Creates a new QuotesFuture instance using the specified properties.
         * @param [properties] Properties to set
         * @returns QuotesFuture instance
         */
        public static create(properties?: pb.IQuotesFuture): pb.QuotesFuture;

        /**
         * Encodes the specified QuotesFuture message. Does not implicitly {@link pb.QuotesFuture.verify|verify} messages.
         * @param message QuotesFuture message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IQuotesFuture, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified QuotesFuture message, length delimited. Does not implicitly {@link pb.QuotesFuture.verify|verify} messages.
         * @param message QuotesFuture message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IQuotesFuture, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a QuotesFuture message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns QuotesFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.QuotesFuture;

        /**
         * Decodes a QuotesFuture message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns QuotesFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.QuotesFuture;

        /**
         * Verifies a QuotesFuture message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a QuotesFuture message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns QuotesFuture
         */
        public static fromObject(object: { [k: string]: any }): pb.QuotesFuture;

        /**
         * Creates a plain object from a QuotesFuture message. Also converts values to other types if specified.
         * @param message QuotesFuture
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.QuotesFuture, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this QuotesFuture to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryAiStockList. */
    interface ICmdQueryAiStockList {

        /** CmdQueryAiStockList rankFrom */
        rankFrom?: (number|null);

        /** CmdQueryAiStockList tsUpdateFrom */
        tsUpdateFrom?: (number|Long|null);

        /** CmdQueryAiStockList total */
        total?: (number|null);

        /** CmdQueryAiStockList codes */
        codes?: (number[]|null);
    }

    /** Represents a CmdQueryAiStockList. */
    class CmdQueryAiStockList implements ICmdQueryAiStockList {

        /**
         * Constructs a new CmdQueryAiStockList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryAiStockList);

        /** CmdQueryAiStockList rankFrom. */
        public rankFrom: number;

        /** CmdQueryAiStockList tsUpdateFrom. */
        public tsUpdateFrom: (number|Long);

        /** CmdQueryAiStockList total. */
        public total: number;

        /** CmdQueryAiStockList codes. */
        public codes: number[];

        /**
         * Creates a new CmdQueryAiStockList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryAiStockList instance
         */
        public static create(properties?: pb.ICmdQueryAiStockList): pb.CmdQueryAiStockList;

        /**
         * Encodes the specified CmdQueryAiStockList message. Does not implicitly {@link pb.CmdQueryAiStockList.verify|verify} messages.
         * @param message CmdQueryAiStockList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryAiStockList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryAiStockList message, length delimited. Does not implicitly {@link pb.CmdQueryAiStockList.verify|verify} messages.
         * @param message CmdQueryAiStockList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryAiStockList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryAiStockList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryAiStockList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryAiStockList;

        /**
         * Decodes a CmdQueryAiStockList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryAiStockList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryAiStockList;

        /**
         * Verifies a CmdQueryAiStockList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryAiStockList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryAiStockList
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryAiStockList;

        /**
         * Creates a plain object from a CmdQueryAiStockList message. Also converts values to other types if specified.
         * @param message CmdQueryAiStockList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryAiStockList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryAiStockList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AiStockItem. */
    interface IAiStockItem {

        /** AiStockItem code */
        code?: (number|null);

        /** AiStockItem name */
        name?: (string|null);

        /** AiStockItem industry */
        industry?: (string|null);

        /** AiStockItem tsUpdated */
        tsUpdated?: (number|Long|null);

        /** AiStockItem profitRanking */
        profitRanking?: (number|null);

        /** AiStockItem profitRate */
        profitRate?: (number|null);

        /** AiStockItem lastAskPrice */
        lastAskPrice?: (number|null);

        /** AiStockItem lastBidPrice */
        lastBidPrice?: (number|null);

        /** AiStockItem curAskPrice */
        curAskPrice?: (number|null);

        /** AiStockItem todaySignal */
        todaySignal?: (number|null);

        /** AiStockItem curAskTs */
        curAskTs?: (number|Long|null);

        /** AiStockItem lastBidTs */
        lastBidTs?: (number|Long|null);

        /** AiStockItem lastAskTs */
        lastAskTs?: (number|Long|null);
    }

    /** Represents an AiStockItem. */
    class AiStockItem implements IAiStockItem {

        /**
         * Constructs a new AiStockItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IAiStockItem);

        /** AiStockItem code. */
        public code: number;

        /** AiStockItem name. */
        public name: string;

        /** AiStockItem industry. */
        public industry: string;

        /** AiStockItem tsUpdated. */
        public tsUpdated: (number|Long);

        /** AiStockItem profitRanking. */
        public profitRanking: number;

        /** AiStockItem profitRate. */
        public profitRate: number;

        /** AiStockItem lastAskPrice. */
        public lastAskPrice: number;

        /** AiStockItem lastBidPrice. */
        public lastBidPrice: number;

        /** AiStockItem curAskPrice. */
        public curAskPrice: number;

        /** AiStockItem todaySignal. */
        public todaySignal: number;

        /** AiStockItem curAskTs. */
        public curAskTs: (number|Long);

        /** AiStockItem lastBidTs. */
        public lastBidTs: (number|Long);

        /** AiStockItem lastAskTs. */
        public lastAskTs: (number|Long);

        /**
         * Creates a new AiStockItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AiStockItem instance
         */
        public static create(properties?: pb.IAiStockItem): pb.AiStockItem;

        /**
         * Encodes the specified AiStockItem message. Does not implicitly {@link pb.AiStockItem.verify|verify} messages.
         * @param message AiStockItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IAiStockItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AiStockItem message, length delimited. Does not implicitly {@link pb.AiStockItem.verify|verify} messages.
         * @param message AiStockItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IAiStockItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AiStockItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AiStockItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.AiStockItem;

        /**
         * Decodes an AiStockItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AiStockItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AiStockItem;

        /**
         * Verifies an AiStockItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AiStockItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AiStockItem
         */
        public static fromObject(object: { [k: string]: any }): pb.AiStockItem;

        /**
         * Creates a plain object from an AiStockItem message. Also converts values to other types if specified.
         * @param message AiStockItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.AiStockItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AiStockItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryAiStockListReply. */
    interface ICmdQueryAiStockListReply {

        /** CmdQueryAiStockListReply items */
        items?: (pb.IAiStockItem[]|null);
    }

    /** Represents a CmdQueryAiStockListReply. */
    class CmdQueryAiStockListReply implements ICmdQueryAiStockListReply {

        /**
         * Constructs a new CmdQueryAiStockListReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryAiStockListReply);

        /** CmdQueryAiStockListReply items. */
        public items: pb.IAiStockItem[];

        /**
         * Creates a new CmdQueryAiStockListReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryAiStockListReply instance
         */
        public static create(properties?: pb.ICmdQueryAiStockListReply): pb.CmdQueryAiStockListReply;

        /**
         * Encodes the specified CmdQueryAiStockListReply message. Does not implicitly {@link pb.CmdQueryAiStockListReply.verify|verify} messages.
         * @param message CmdQueryAiStockListReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryAiStockListReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryAiStockListReply message, length delimited. Does not implicitly {@link pb.CmdQueryAiStockListReply.verify|verify} messages.
         * @param message CmdQueryAiStockListReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryAiStockListReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryAiStockListReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryAiStockListReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryAiStockListReply;

        /**
         * Decodes a CmdQueryAiStockListReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryAiStockListReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryAiStockListReply;

        /**
         * Verifies a CmdQueryAiStockListReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryAiStockListReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryAiStockListReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryAiStockListReply;

        /**
         * Creates a plain object from a CmdQueryAiStockListReply message. Also converts values to other types if specified.
         * @param message CmdQueryAiStockListReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryAiStockListReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryAiStockListReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryAiSignal. */
    interface ICmdQueryAiSignal {

        /** CmdQueryAiSignal code */
        code?: (number|null);
    }

    /** Represents a CmdQueryAiSignal. */
    class CmdQueryAiSignal implements ICmdQueryAiSignal {

        /**
         * Constructs a new CmdQueryAiSignal.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryAiSignal);

        /** CmdQueryAiSignal code. */
        public code: number;

        /**
         * Creates a new CmdQueryAiSignal instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryAiSignal instance
         */
        public static create(properties?: pb.ICmdQueryAiSignal): pb.CmdQueryAiSignal;

        /**
         * Encodes the specified CmdQueryAiSignal message. Does not implicitly {@link pb.CmdQueryAiSignal.verify|verify} messages.
         * @param message CmdQueryAiSignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryAiSignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryAiSignal message, length delimited. Does not implicitly {@link pb.CmdQueryAiSignal.verify|verify} messages.
         * @param message CmdQueryAiSignal message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryAiSignal, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryAiSignal message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryAiSignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryAiSignal;

        /**
         * Decodes a CmdQueryAiSignal message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryAiSignal
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryAiSignal;

        /**
         * Verifies a CmdQueryAiSignal message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryAiSignal message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryAiSignal
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryAiSignal;

        /**
         * Creates a plain object from a CmdQueryAiSignal message. Also converts values to other types if specified.
         * @param message CmdQueryAiSignal
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryAiSignal, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryAiSignal to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an AiSignalItem. */
    interface IAiSignalItem {

        /** AiSignalItem ts */
        ts?: (number|Long|null);

        /** AiSignalItem flag */
        flag?: (number|null);

        /** AiSignalItem price */
        price?: (number|null);

        /** AiSignalItem ma10 */
        ma10?: (number|null);

        /** AiSignalItem ma30 */
        ma30?: (number|null);
    }

    /** Represents an AiSignalItem. */
    class AiSignalItem implements IAiSignalItem {

        /**
         * Constructs a new AiSignalItem.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IAiSignalItem);

        /** AiSignalItem ts. */
        public ts: (number|Long);

        /** AiSignalItem flag. */
        public flag: number;

        /** AiSignalItem price. */
        public price: number;

        /** AiSignalItem ma10. */
        public ma10: number;

        /** AiSignalItem ma30. */
        public ma30: number;

        /**
         * Creates a new AiSignalItem instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AiSignalItem instance
         */
        public static create(properties?: pb.IAiSignalItem): pb.AiSignalItem;

        /**
         * Encodes the specified AiSignalItem message. Does not implicitly {@link pb.AiSignalItem.verify|verify} messages.
         * @param message AiSignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IAiSignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AiSignalItem message, length delimited. Does not implicitly {@link pb.AiSignalItem.verify|verify} messages.
         * @param message AiSignalItem message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IAiSignalItem, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AiSignalItem message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AiSignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.AiSignalItem;

        /**
         * Decodes an AiSignalItem message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AiSignalItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AiSignalItem;

        /**
         * Verifies an AiSignalItem message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AiSignalItem message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AiSignalItem
         */
        public static fromObject(object: { [k: string]: any }): pb.AiSignalItem;

        /**
         * Creates a plain object from an AiSignalItem message. Also converts values to other types if specified.
         * @param message AiSignalItem
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.AiSignalItem, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AiSignalItem to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdQueryAiSignalReply. */
    interface ICmdQueryAiSignalReply {

        /** CmdQueryAiSignalReply code */
        code?: (number|null);

        /** CmdQueryAiSignalReply industry */
        industry?: (string|null);

        /** CmdQueryAiSignalReply signals */
        signals?: (pb.IAiSignalItem[]|null);
    }

    /** Represents a CmdQueryAiSignalReply. */
    class CmdQueryAiSignalReply implements ICmdQueryAiSignalReply {

        /**
         * Constructs a new CmdQueryAiSignalReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryAiSignalReply);

        /** CmdQueryAiSignalReply code. */
        public code: number;

        /** CmdQueryAiSignalReply industry. */
        public industry: string;

        /** CmdQueryAiSignalReply signals. */
        public signals: pb.IAiSignalItem[];

        /**
         * Creates a new CmdQueryAiSignalReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdQueryAiSignalReply instance
         */
        public static create(properties?: pb.ICmdQueryAiSignalReply): pb.CmdQueryAiSignalReply;

        /**
         * Encodes the specified CmdQueryAiSignalReply message. Does not implicitly {@link pb.CmdQueryAiSignalReply.verify|verify} messages.
         * @param message CmdQueryAiSignalReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdQueryAiSignalReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdQueryAiSignalReply message, length delimited. Does not implicitly {@link pb.CmdQueryAiSignalReply.verify|verify} messages.
         * @param message CmdQueryAiSignalReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdQueryAiSignalReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdQueryAiSignalReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdQueryAiSignalReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdQueryAiSignalReply;

        /**
         * Decodes a CmdQueryAiSignalReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdQueryAiSignalReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdQueryAiSignalReply;

        /**
         * Verifies a CmdQueryAiSignalReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdQueryAiSignalReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdQueryAiSignalReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdQueryAiSignalReply;

        /**
         * Creates a plain object from a CmdQueryAiSignalReply message. Also converts values to other types if specified.
         * @param message CmdQueryAiSignalReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdQueryAiSignalReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdQueryAiSignalReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents a QuotesService */
    class QuotesService extends $protobuf.rpc.Service {

        /**
         * Constructs a new QuotesService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new QuotesService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): QuotesService;

        /**
         * Calls QuotesQuery.
         * @param request CmdQuoteQuery message or plain object
         * @param callback Node-style callback called with the error, if any, and Quotes
         */
        public quotesQuery(request: pb.ICmdQuoteQuery, callback: pb.QuotesService.QuotesQueryCallback): void;

        /**
         * Calls QuotesQuery.
         * @param request CmdQuoteQuery message or plain object
         * @returns Promise
         */
        public quotesQuery(request: pb.ICmdQuoteQuery): Promise<pb.Quotes>;

        /**
         * Calls QuotesSubscribe.
         * @param request CmdQuoteSubscribe message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public quotesSubscribe(request: pb.ICmdQuoteSubscribe, callback: pb.QuotesService.QuotesSubscribeCallback): void;

        /**
         * Calls QuotesSubscribe.
         * @param request CmdQuoteSubscribe message or plain object
         * @returns Promise
         */
        public quotesSubscribe(request: pb.ICmdQuoteSubscribe): Promise<pb.ErrorInfo>;

        /**
         * Calls IsTradingDay.
         * @param request CmdTradingDay message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdTradingDayReply
         */
        public isTradingDay(request: pb.ICmdTradingDay, callback: pb.QuotesService.IsTradingDayCallback): void;

        /**
         * Calls IsTradingDay.
         * @param request CmdTradingDay message or plain object
         * @returns Promise
         */
        public isTradingDay(request: pb.ICmdTradingDay): Promise<pb.CmdTradingDayReply>;

        /**
         * Calls QueryTradingDay.
         * @param request CmdTradingDay message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdTradingDayReply
         */
        public queryTradingDay(request: pb.ICmdTradingDay, callback: pb.QuotesService.QueryTradingDayCallback): void;

        /**
         * Calls QueryTradingDay.
         * @param request CmdTradingDay message or plain object
         * @returns Promise
         */
        public queryTradingDay(request: pb.ICmdTradingDay): Promise<pb.CmdTradingDayReply>;

        /**
         * Calls QueryAiStockList.
         * @param request CmdQueryAiStockList message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdQueryAiStockListReply
         */
        public queryAiStockList(request: pb.ICmdQueryAiStockList, callback: pb.QuotesService.QueryAiStockListCallback): void;

        /**
         * Calls QueryAiStockList.
         * @param request CmdQueryAiStockList message or plain object
         * @returns Promise
         */
        public queryAiStockList(request: pb.ICmdQueryAiStockList): Promise<pb.CmdQueryAiStockListReply>;

        /**
         * Calls QueryAiSignal.
         * @param request CmdQueryAiSignal message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdQueryAiSignalReply
         */
        public queryAiSignal(request: pb.ICmdQueryAiSignal, callback: pb.QuotesService.QueryAiSignalCallback): void;

        /**
         * Calls QueryAiSignal.
         * @param request CmdQueryAiSignal message or plain object
         * @returns Promise
         */
        public queryAiSignal(request: pb.ICmdQueryAiSignal): Promise<pb.CmdQueryAiSignalReply>;
    }

    namespace QuotesService {

        /**
         * Callback as used by {@link pb.QuotesService#quotesQuery}.
         * @param error Error, if any
         * @param [response] Quotes
         */
        type QuotesQueryCallback = (error: (Error|null), response?: pb.Quotes) => void;

        /**
         * Callback as used by {@link pb.QuotesService#quotesSubscribe}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type QuotesSubscribeCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.QuotesService#isTradingDay}.
         * @param error Error, if any
         * @param [response] CmdTradingDayReply
         */
        type IsTradingDayCallback = (error: (Error|null), response?: pb.CmdTradingDayReply) => void;

        /**
         * Callback as used by {@link pb.QuotesService#queryTradingDay}.
         * @param error Error, if any
         * @param [response] CmdTradingDayReply
         */
        type QueryTradingDayCallback = (error: (Error|null), response?: pb.CmdTradingDayReply) => void;

        /**
         * Callback as used by {@link pb.QuotesService#queryAiStockList}.
         * @param error Error, if any
         * @param [response] CmdQueryAiStockListReply
         */
        type QueryAiStockListCallback = (error: (Error|null), response?: pb.CmdQueryAiStockListReply) => void;

        /**
         * Callback as used by {@link pb.QuotesService#queryAiSignal}.
         * @param error Error, if any
         * @param [response] CmdQueryAiSignalReply
         */
        type QueryAiSignalCallback = (error: (Error|null), response?: pb.CmdQueryAiSignalReply) => void;
    }

    /** Represents a QuotesFutureService */
    class QuotesFutureService extends $protobuf.rpc.Service {

        /**
         * Constructs a new QuotesFutureService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new QuotesFutureService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): QuotesFutureService;

        /**
         * Calls QuotesQuery.
         * @param request CmdQuoteQueryFuture message or plain object
         * @param callback Node-style callback called with the error, if any, and QuotesFuture
         */
        public quotesQuery(request: pb.ICmdQuoteQueryFuture, callback: pb.QuotesFutureService.QuotesQueryCallback): void;

        /**
         * Calls QuotesQuery.
         * @param request CmdQuoteQueryFuture message or plain object
         * @returns Promise
         */
        public quotesQuery(request: pb.ICmdQuoteQueryFuture): Promise<pb.QuotesFuture>;
    }

    namespace QuotesFutureService {

        /**
         * Callback as used by {@link pb.QuotesFutureService#quotesQuery}.
         * @param error Error, if any
         * @param [response] QuotesFuture
         */
        type QuotesQueryCallback = (error: (Error|null), response?: pb.QuotesFuture) => void;
    }

    /** Platform enum. */
    enum Platform {
        Platform_Null = 0,
        Platform_Andriod = 1,
        Platform_Apple = 2,
        Platform_WeChatMinProgram = 3
    }

    /** AppFrom enum. */
    enum AppFrom {
        Ios_000 = 0,
        Android_001 = 1,
        Android_201 = 201,
        Android_204 = 204,
        Android_205 = 205,
        Android_206 = 206,
        Android_208 = 208,
        Android_209 = 209,
        Android_210 = 210,
        Android_211 = 211,
        Android_212 = 212,
        Android_301 = 301,
        Android_302 = 302,
        Android_601 = 601,
        Android_1000 = 1000,
        Android_1204 = 1204,
        Android_1205 = 1205,
        Android_1208 = 1208,
        Android_1212 = 1212,
        WebsiteAndriod = 4999,
        WebsiteIos = 6666,
        IosAppleStore = 6667,
        Ipad = 6668,
        WeChatMinProgram = 8888,
        Website3th = 9999,
        Test = 10000
    }

    /** LoginType enum. */
    enum LoginType {
        LoginType_NULL = 0,
        MobilePhoneId = 1,
        WeChat = 2,
        QQ = 3,
        WeChat_MiniProg = 4,
        AppTest = 98,
        WebTest = 99
    }

    /** AdPosition enum. */
    enum AdPosition {
        AdPosition_NULL = 0,
        AdPosition_Startup = 1,
        AdPosition_Main = 2,
        AdPosition_Exit = 3,
        AdPosition_Plugin = 4,
        AdPosition_CgdsList = 5,
        AdPosition_AiStockList = 6,
        AdPosition_Qihuo = 7,
        AdPosition_DailyAward = 8,
        AdPosition_7Award = 9,
        AdPosition_Dxxl = 10,
        AdPosition_Qhxl = 11,
        AdPosition_Tjdxl = 12,
        AdPosition_Broker = 13,
        AdPosition_Cg = 14
    }

    /** Properties of an AdClicked. */
    interface IAdClicked {

        /** AdClicked id */
        id?: (number|null);

        /** AdClicked pos */
        pos?: (number|null);

        /** AdClicked url */
        url?: (string|null);

        /** AdClicked title */
        title?: (string|null);

        /** AdClicked uid */
        uid?: (number|null);

        /** AdClicked from */
        from?: (pb.AppFrom|null);

        /** AdClicked gold */
        gold?: (number|null);

        /** AdClicked diamond */
        diamond?: (number|null);

        /** AdClicked coupon */
        coupon?: (number|null);
    }

    /** Represents an AdClicked. */
    class AdClicked implements IAdClicked {

        /**
         * Constructs a new AdClicked.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IAdClicked);

        /** AdClicked id. */
        public id: number;

        /** AdClicked pos. */
        public pos: number;

        /** AdClicked url. */
        public url: string;

        /** AdClicked title. */
        public title: string;

        /** AdClicked uid. */
        public uid: number;

        /** AdClicked from. */
        public from: pb.AppFrom;

        /** AdClicked gold. */
        public gold: number;

        /** AdClicked diamond. */
        public diamond: number;

        /** AdClicked coupon. */
        public coupon: number;

        /**
         * Creates a new AdClicked instance using the specified properties.
         * @param [properties] Properties to set
         * @returns AdClicked instance
         */
        public static create(properties?: pb.IAdClicked): pb.AdClicked;

        /**
         * Encodes the specified AdClicked message. Does not implicitly {@link pb.AdClicked.verify|verify} messages.
         * @param message AdClicked message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IAdClicked, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified AdClicked message, length delimited. Does not implicitly {@link pb.AdClicked.verify|verify} messages.
         * @param message AdClicked message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IAdClicked, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an AdClicked message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns AdClicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.AdClicked;

        /**
         * Decodes an AdClicked message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns AdClicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.AdClicked;

        /**
         * Verifies an AdClicked message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an AdClicked message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns AdClicked
         */
        public static fromObject(object: { [k: string]: any }): pb.AdClicked;

        /**
         * Creates a plain object from an AdClicked message. Also converts values to other types if specified.
         * @param message AdClicked
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.AdClicked, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this AdClicked to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdRegistry. */
    interface ICmdRegistry {

        /** CmdRegistry account */
        account?: (string|null);

        /** CmdRegistry type */
        type?: (pb.LoginType|null);

        /** CmdRegistry pwd */
        pwd?: (string|null);

        /** CmdRegistry smsCode */
        smsCode?: (string|null);

        /** CmdRegistry from */
        from?: (pb.AppFrom|null);

        /** CmdRegistry websocket */
        websocket?: (boolean|null);

        /** CmdRegistry unionId */
        unionId?: (string|null);

        /** CmdRegistry inviter */
        inviter?: (number|null);
    }

    /** Represents a CmdRegistry. */
    class CmdRegistry implements ICmdRegistry {

        /**
         * Constructs a new CmdRegistry.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdRegistry);

        /** CmdRegistry account. */
        public account: string;

        /** CmdRegistry type. */
        public type: pb.LoginType;

        /** CmdRegistry pwd. */
        public pwd: string;

        /** CmdRegistry smsCode. */
        public smsCode: string;

        /** CmdRegistry from. */
        public from: pb.AppFrom;

        /** CmdRegistry websocket. */
        public websocket: boolean;

        /** CmdRegistry unionId. */
        public unionId: string;

        /** CmdRegistry inviter. */
        public inviter: number;

        /**
         * Creates a new CmdRegistry instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdRegistry instance
         */
        public static create(properties?: pb.ICmdRegistry): pb.CmdRegistry;

        /**
         * Encodes the specified CmdRegistry message. Does not implicitly {@link pb.CmdRegistry.verify|verify} messages.
         * @param message CmdRegistry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdRegistry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdRegistry message, length delimited. Does not implicitly {@link pb.CmdRegistry.verify|verify} messages.
         * @param message CmdRegistry message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdRegistry, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdRegistry message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdRegistry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdRegistry;

        /**
         * Decodes a CmdRegistry message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdRegistry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdRegistry;

        /**
         * Verifies a CmdRegistry message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdRegistry message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdRegistry
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdRegistry;

        /**
         * Creates a plain object from a CmdRegistry message. Also converts values to other types if specified.
         * @param message CmdRegistry
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdRegistry, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdRegistry to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdLogin. */
    interface ICmdLogin {

        /** CmdLogin account */
        account?: (string|null);

        /** CmdLogin type */
        type?: (pb.LoginType|null);

        /** CmdLogin pwd */
        pwd?: (string|null);

        /** CmdLogin from */
        from?: (pb.AppFrom|null);

        /** CmdLogin websocket */
        websocket?: (boolean|null);

        /** CmdLogin unionId */
        unionId?: (string|null);

        /** CmdLogin inviter */
        inviter?: (number|null);
    }

    /** Represents a CmdLogin. */
    class CmdLogin implements ICmdLogin {

        /**
         * Constructs a new CmdLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdLogin);

        /** CmdLogin account. */
        public account: string;

        /** CmdLogin type. */
        public type: pb.LoginType;

        /** CmdLogin pwd. */
        public pwd: string;

        /** CmdLogin from. */
        public from: pb.AppFrom;

        /** CmdLogin websocket. */
        public websocket: boolean;

        /** CmdLogin unionId. */
        public unionId: string;

        /** CmdLogin inviter. */
        public inviter: number;

        /**
         * Creates a new CmdLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdLogin instance
         */
        public static create(properties?: pb.ICmdLogin): pb.CmdLogin;

        /**
         * Encodes the specified CmdLogin message. Does not implicitly {@link pb.CmdLogin.verify|verify} messages.
         * @param message CmdLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdLogin message, length delimited. Does not implicitly {@link pb.CmdLogin.verify|verify} messages.
         * @param message CmdLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdLogin;

        /**
         * Decodes a CmdLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdLogin;

        /**
         * Verifies a CmdLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdLogin
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdLogin;

        /**
         * Creates a plain object from a CmdLogin message. Also converts values to other types if specified.
         * @param message CmdLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdLoginReply. */
    interface ICmdLoginReply {

        /** CmdLoginReply err */
        err?: (pb.IErrorInfo|null);

        /** CmdLoginReply uid */
        uid?: (number|null);

        /** CmdLoginReply token */
        token?: (string|null);

        /** CmdLoginReply gameAddr */
        gameAddr?: (string|null);
    }

    /** Represents a CmdLoginReply. */
    class CmdLoginReply implements ICmdLoginReply {

        /**
         * Constructs a new CmdLoginReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdLoginReply);

        /** CmdLoginReply err. */
        public err?: (pb.IErrorInfo|null);

        /** CmdLoginReply uid. */
        public uid: number;

        /** CmdLoginReply token. */
        public token: string;

        /** CmdLoginReply gameAddr. */
        public gameAddr: string;

        /**
         * Creates a new CmdLoginReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdLoginReply instance
         */
        public static create(properties?: pb.ICmdLoginReply): pb.CmdLoginReply;

        /**
         * Encodes the specified CmdLoginReply message. Does not implicitly {@link pb.CmdLoginReply.verify|verify} messages.
         * @param message CmdLoginReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdLoginReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdLoginReply message, length delimited. Does not implicitly {@link pb.CmdLoginReply.verify|verify} messages.
         * @param message CmdLoginReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdLoginReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdLoginReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdLoginReply;

        /**
         * Decodes a CmdLoginReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdLoginReply;

        /**
         * Verifies a CmdLoginReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdLoginReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdLoginReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdLoginReply;

        /**
         * Creates a plain object from a CmdLoginReply message. Also converts values to other types if specified.
         * @param message CmdLoginReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdLoginReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdLoginReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetCaptcha. */
    interface ICmdGetCaptcha {

        /** CmdGetCaptcha account */
        account?: (string|null);
    }

    /** Represents a CmdGetCaptcha. */
    class CmdGetCaptcha implements ICmdGetCaptcha {

        /**
         * Constructs a new CmdGetCaptcha.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetCaptcha);

        /** CmdGetCaptcha account. */
        public account: string;

        /**
         * Creates a new CmdGetCaptcha instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetCaptcha instance
         */
        public static create(properties?: pb.ICmdGetCaptcha): pb.CmdGetCaptcha;

        /**
         * Encodes the specified CmdGetCaptcha message. Does not implicitly {@link pb.CmdGetCaptcha.verify|verify} messages.
         * @param message CmdGetCaptcha message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetCaptcha, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetCaptcha message, length delimited. Does not implicitly {@link pb.CmdGetCaptcha.verify|verify} messages.
         * @param message CmdGetCaptcha message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetCaptcha, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetCaptcha message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetCaptcha
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetCaptcha;

        /**
         * Decodes a CmdGetCaptcha message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetCaptcha
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetCaptcha;

        /**
         * Verifies a CmdGetCaptcha message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetCaptcha message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetCaptcha
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetCaptcha;

        /**
         * Creates a plain object from a CmdGetCaptcha message. Also converts values to other types if specified.
         * @param message CmdGetCaptcha
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetCaptcha, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetCaptcha to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetCaptchaReply. */
    interface ICmdGetCaptchaReply {

        /** CmdGetCaptchaReply captcha */
        captcha?: (Uint8Array|null);
    }

    /** Represents a CmdGetCaptchaReply. */
    class CmdGetCaptchaReply implements ICmdGetCaptchaReply {

        /**
         * Constructs a new CmdGetCaptchaReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetCaptchaReply);

        /** CmdGetCaptchaReply captcha. */
        public captcha: Uint8Array;

        /**
         * Creates a new CmdGetCaptchaReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetCaptchaReply instance
         */
        public static create(properties?: pb.ICmdGetCaptchaReply): pb.CmdGetCaptchaReply;

        /**
         * Encodes the specified CmdGetCaptchaReply message. Does not implicitly {@link pb.CmdGetCaptchaReply.verify|verify} messages.
         * @param message CmdGetCaptchaReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetCaptchaReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetCaptchaReply message, length delimited. Does not implicitly {@link pb.CmdGetCaptchaReply.verify|verify} messages.
         * @param message CmdGetCaptchaReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetCaptchaReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetCaptchaReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetCaptchaReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetCaptchaReply;

        /**
         * Decodes a CmdGetCaptchaReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetCaptchaReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetCaptchaReply;

        /**
         * Verifies a CmdGetCaptchaReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetCaptchaReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetCaptchaReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetCaptchaReply;

        /**
         * Creates a plain object from a CmdGetCaptchaReply message. Also converts values to other types if specified.
         * @param message CmdGetCaptchaReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetCaptchaReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetCaptchaReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGetSms. */
    interface ICmdGetSms {

        /** CmdGetSms account */
        account?: (string|null);

        /** CmdGetSms captcha */
        captcha?: (string|null);
    }

    /** Represents a CmdGetSms. */
    class CmdGetSms implements ICmdGetSms {

        /**
         * Constructs a new CmdGetSms.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetSms);

        /** CmdGetSms account. */
        public account: string;

        /** CmdGetSms captcha. */
        public captcha: string;

        /**
         * Creates a new CmdGetSms instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetSms instance
         */
        public static create(properties?: pb.ICmdGetSms): pb.CmdGetSms;

        /**
         * Encodes the specified CmdGetSms message. Does not implicitly {@link pb.CmdGetSms.verify|verify} messages.
         * @param message CmdGetSms message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetSms, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetSms message, length delimited. Does not implicitly {@link pb.CmdGetSms.verify|verify} messages.
         * @param message CmdGetSms message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetSms, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetSms message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetSms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetSms;

        /**
         * Decodes a CmdGetSms message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetSms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetSms;

        /**
         * Verifies a CmdGetSms message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetSms message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetSms
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetSms;

        /**
         * Creates a plain object from a CmdGetSms message. Also converts values to other types if specified.
         * @param message CmdGetSms
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetSms, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetSms to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdResetPwd. */
    interface ICmdResetPwd {

        /** CmdResetPwd account */
        account?: (string|null);

        /** CmdResetPwd pwd */
        pwd?: (string|null);

        /** CmdResetPwd captcha */
        captcha?: (string|null);
    }

    /** Represents a CmdResetPwd. */
    class CmdResetPwd implements ICmdResetPwd {

        /**
         * Constructs a new CmdResetPwd.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdResetPwd);

        /** CmdResetPwd account. */
        public account: string;

        /** CmdResetPwd pwd. */
        public pwd: string;

        /** CmdResetPwd captcha. */
        public captcha: string;

        /**
         * Creates a new CmdResetPwd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdResetPwd instance
         */
        public static create(properties?: pb.ICmdResetPwd): pb.CmdResetPwd;

        /**
         * Encodes the specified CmdResetPwd message. Does not implicitly {@link pb.CmdResetPwd.verify|verify} messages.
         * @param message CmdResetPwd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdResetPwd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdResetPwd message, length delimited. Does not implicitly {@link pb.CmdResetPwd.verify|verify} messages.
         * @param message CmdResetPwd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdResetPwd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdResetPwd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdResetPwd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdResetPwd;

        /**
         * Decodes a CmdResetPwd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdResetPwd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdResetPwd;

        /**
         * Verifies a CmdResetPwd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdResetPwd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdResetPwd
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdResetPwd;

        /**
         * Creates a plain object from a CmdResetPwd message. Also converts values to other types if specified.
         * @param message CmdResetPwd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdResetPwd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdResetPwd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdPay. */
    interface ICmdPay {

        /** CmdPay uid */
        uid?: (number|null);

        /** CmdPay orderId */
        orderId?: (number|Long|null);
    }

    /** Represents a CmdPay. */
    class CmdPay implements ICmdPay {

        /**
         * Constructs a new CmdPay.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdPay);

        /** CmdPay uid. */
        public uid: number;

        /** CmdPay orderId. */
        public orderId: (number|Long);

        /**
         * Creates a new CmdPay instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdPay instance
         */
        public static create(properties?: pb.ICmdPay): pb.CmdPay;

        /**
         * Encodes the specified CmdPay message. Does not implicitly {@link pb.CmdPay.verify|verify} messages.
         * @param message CmdPay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdPay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdPay message, length delimited. Does not implicitly {@link pb.CmdPay.verify|verify} messages.
         * @param message CmdPay message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdPay, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdPay message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdPay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdPay;

        /**
         * Decodes a CmdPay message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdPay
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdPay;

        /**
         * Verifies a CmdPay message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdPay message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdPay
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdPay;

        /**
         * Creates a plain object from a CmdPay message. Also converts values to other types if specified.
         * @param message CmdPay
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdPay, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdPay to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents a LoginService */
    class LoginService extends $protobuf.rpc.Service {

        /**
         * Constructs a new LoginService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new LoginService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): LoginService;

        /**
         * Calls Registry.
         * @param request CmdRegistry message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public registry(request: pb.ICmdRegistry, callback: pb.LoginService.RegistryCallback): void;

        /**
         * Calls Registry.
         * @param request CmdRegistry message or plain object
         * @returns Promise
         */
        public registry(request: pb.ICmdRegistry): Promise<pb.ErrorInfo>;

        /**
         * Calls Login.
         * @param request CmdLogin message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdLoginReply
         */
        public login(request: pb.ICmdLogin, callback: pb.LoginService.LoginCallback): void;

        /**
         * Calls Login.
         * @param request CmdLogin message or plain object
         * @returns Promise
         */
        public login(request: pb.ICmdLogin): Promise<pb.CmdLoginReply>;

        /**
         * Calls GetCaptcha.
         * @param request CmdGetCaptcha message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdGetCaptchaReply
         */
        public getCaptcha(request: pb.ICmdGetCaptcha, callback: pb.LoginService.GetCaptchaCallback): void;

        /**
         * Calls GetCaptcha.
         * @param request CmdGetCaptcha message or plain object
         * @returns Promise
         */
        public getCaptcha(request: pb.ICmdGetCaptcha): Promise<pb.CmdGetCaptchaReply>;

        /**
         * Calls GetSms.
         * @param request CmdGetSms message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public getSms(request: pb.ICmdGetSms, callback: pb.LoginService.GetSmsCallback): void;

        /**
         * Calls GetSms.
         * @param request CmdGetSms message or plain object
         * @returns Promise
         */
        public getSms(request: pb.ICmdGetSms): Promise<pb.ErrorInfo>;

        /**
         * Calls ResetPwd.
         * @param request CmdResetPwd message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public resetPwd(request: pb.ICmdResetPwd, callback: pb.LoginService.ResetPwdCallback): void;

        /**
         * Calls ResetPwd.
         * @param request CmdResetPwd message or plain object
         * @returns Promise
         */
        public resetPwd(request: pb.ICmdResetPwd): Promise<pb.ErrorInfo>;
    }

    namespace LoginService {

        /**
         * Callback as used by {@link pb.LoginService#registry}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type RegistryCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.LoginService#login}.
         * @param error Error, if any
         * @param [response] CmdLoginReply
         */
        type LoginCallback = (error: (Error|null), response?: pb.CmdLoginReply) => void;

        /**
         * Callback as used by {@link pb.LoginService#getCaptcha}.
         * @param error Error, if any
         * @param [response] CmdGetCaptchaReply
         */
        type GetCaptchaCallback = (error: (Error|null), response?: pb.CmdGetCaptchaReply) => void;

        /**
         * Callback as used by {@link pb.LoginService#getSms}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type GetSmsCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.LoginService#resetPwd}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type ResetPwdCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;
    }

    /** SyncAct enum. */
    enum SyncAct {
        SyncAct_NULL = 0,
        Set = 1,
        Del = 2
    }

    /** ServerCmdId enum. */
    enum ServerCmdId {
        ServerCmdId_NULL = 0,
        ReloadGameConf = 1
    }

    /** Properties of a CmdNewUidReply. */
    interface ICmdNewUidReply {

        /** CmdNewUidReply uid */
        uid?: (number|null);
    }

    /** Represents a CmdNewUidReply. */
    class CmdNewUidReply implements ICmdNewUidReply {

        /**
         * Constructs a new CmdNewUidReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdNewUidReply);

        /** CmdNewUidReply uid. */
        public uid: number;

        /**
         * Creates a new CmdNewUidReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdNewUidReply instance
         */
        public static create(properties?: pb.ICmdNewUidReply): pb.CmdNewUidReply;

        /**
         * Encodes the specified CmdNewUidReply message. Does not implicitly {@link pb.CmdNewUidReply.verify|verify} messages.
         * @param message CmdNewUidReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdNewUidReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdNewUidReply message, length delimited. Does not implicitly {@link pb.CmdNewUidReply.verify|verify} messages.
         * @param message CmdNewUidReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdNewUidReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdNewUidReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdNewUidReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdNewUidReply;

        /**
         * Decodes a CmdNewUidReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdNewUidReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdNewUidReply;

        /**
         * Verifies a CmdNewUidReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdNewUidReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdNewUidReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdNewUidReply;

        /**
         * Creates a plain object from a CmdNewUidReply message. Also converts values to other types if specified.
         * @param message CmdNewUidReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdNewUidReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdNewUidReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdNewRoomIdReply. */
    interface ICmdNewRoomIdReply {

        /** CmdNewRoomIdReply id */
        id?: (number|null);
    }

    /** Represents a CmdNewRoomIdReply. */
    class CmdNewRoomIdReply implements ICmdNewRoomIdReply {

        /**
         * Constructs a new CmdNewRoomIdReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdNewRoomIdReply);

        /** CmdNewRoomIdReply id. */
        public id: number;

        /**
         * Creates a new CmdNewRoomIdReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdNewRoomIdReply instance
         */
        public static create(properties?: pb.ICmdNewRoomIdReply): pb.CmdNewRoomIdReply;

        /**
         * Encodes the specified CmdNewRoomIdReply message. Does not implicitly {@link pb.CmdNewRoomIdReply.verify|verify} messages.
         * @param message CmdNewRoomIdReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdNewRoomIdReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdNewRoomIdReply message, length delimited. Does not implicitly {@link pb.CmdNewRoomIdReply.verify|verify} messages.
         * @param message CmdNewRoomIdReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdNewRoomIdReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdNewRoomIdReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdNewRoomIdReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdNewRoomIdReply;

        /**
         * Decodes a CmdNewRoomIdReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdNewRoomIdReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdNewRoomIdReply;

        /**
         * Verifies a CmdNewRoomIdReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdNewRoomIdReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdNewRoomIdReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdNewRoomIdReply;

        /**
         * Creates a plain object from a CmdNewRoomIdReply message. Also converts values to other types if specified.
         * @param message CmdNewRoomIdReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdNewRoomIdReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdNewRoomIdReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGateAddr. */
    interface ICmdGateAddr {

        /** CmdGateAddr uid */
        uid?: (number|null);
    }

    /** Represents a CmdGateAddr. */
    class CmdGateAddr implements ICmdGateAddr {

        /**
         * Constructs a new CmdGateAddr.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGateAddr);

        /** CmdGateAddr uid. */
        public uid: number;

        /**
         * Creates a new CmdGateAddr instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGateAddr instance
         */
        public static create(properties?: pb.ICmdGateAddr): pb.CmdGateAddr;

        /**
         * Encodes the specified CmdGateAddr message. Does not implicitly {@link pb.CmdGateAddr.verify|verify} messages.
         * @param message CmdGateAddr message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGateAddr, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGateAddr message, length delimited. Does not implicitly {@link pb.CmdGateAddr.verify|verify} messages.
         * @param message CmdGateAddr message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGateAddr, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGateAddr message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGateAddr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGateAddr;

        /**
         * Decodes a CmdGateAddr message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGateAddr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGateAddr;

        /**
         * Verifies a CmdGateAddr message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGateAddr message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGateAddr
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGateAddr;

        /**
         * Creates a plain object from a CmdGateAddr message. Also converts values to other types if specified.
         * @param message CmdGateAddr
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGateAddr, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGateAddr to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGateAddrReply. */
    interface ICmdGateAddrReply {

        /** CmdGateAddrReply uid */
        uid?: (number|null);

        /** CmdGateAddrReply addr */
        addr?: (string|null);
    }

    /** Represents a CmdGateAddrReply. */
    class CmdGateAddrReply implements ICmdGateAddrReply {

        /**
         * Constructs a new CmdGateAddrReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGateAddrReply);

        /** CmdGateAddrReply uid. */
        public uid: number;

        /** CmdGateAddrReply addr. */
        public addr: string;

        /**
         * Creates a new CmdGateAddrReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGateAddrReply instance
         */
        public static create(properties?: pb.ICmdGateAddrReply): pb.CmdGateAddrReply;

        /**
         * Encodes the specified CmdGateAddrReply message. Does not implicitly {@link pb.CmdGateAddrReply.verify|verify} messages.
         * @param message CmdGateAddrReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGateAddrReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGateAddrReply message, length delimited. Does not implicitly {@link pb.CmdGateAddrReply.verify|verify} messages.
         * @param message CmdGateAddrReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGateAddrReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGateAddrReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGateAddrReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGateAddrReply;

        /**
         * Decodes a CmdGateAddrReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGateAddrReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGateAddrReply;

        /**
         * Verifies a CmdGateAddrReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGateAddrReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGateAddrReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGateAddrReply;

        /**
         * Creates a plain object from a CmdGateAddrReply message. Also converts values to other types if specified.
         * @param message CmdGateAddrReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGateAddrReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGateAddrReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUserLogin. */
    interface ICmdUserLogin {

        /** CmdUserLogin uid */
        uid?: (number|null);

        /** CmdUserLogin type */
        type?: (pb.LoginType|null);

        /** CmdUserLogin from */
        from?: (pb.AppFrom|null);

        /** CmdUserLogin ip */
        ip?: (string|null);
    }

    /** Represents a CmdUserLogin. */
    class CmdUserLogin implements ICmdUserLogin {

        /**
         * Constructs a new CmdUserLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUserLogin);

        /** CmdUserLogin uid. */
        public uid: number;

        /** CmdUserLogin type. */
        public type: pb.LoginType;

        /** CmdUserLogin from. */
        public from: pb.AppFrom;

        /** CmdUserLogin ip. */
        public ip: string;

        /**
         * Creates a new CmdUserLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUserLogin instance
         */
        public static create(properties?: pb.ICmdUserLogin): pb.CmdUserLogin;

        /**
         * Encodes the specified CmdUserLogin message. Does not implicitly {@link pb.CmdUserLogin.verify|verify} messages.
         * @param message CmdUserLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUserLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUserLogin message, length delimited. Does not implicitly {@link pb.CmdUserLogin.verify|verify} messages.
         * @param message CmdUserLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUserLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUserLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUserLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUserLogin;

        /**
         * Decodes a CmdUserLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUserLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUserLogin;

        /**
         * Verifies a CmdUserLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUserLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUserLogin
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUserLogin;

        /**
         * Creates a plain object from a CmdUserLogin message. Also converts values to other types if specified.
         * @param message CmdUserLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUserLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUserLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUserLoginReply. */
    interface ICmdUserLoginReply {

        /** CmdUserLoginReply uid */
        uid?: (number|null);

        /** CmdUserLoginReply token */
        token?: (string|null);

        /** CmdUserLoginReply addr */
        addr?: (string|null);
    }

    /** Represents a CmdUserLoginReply. */
    class CmdUserLoginReply implements ICmdUserLoginReply {

        /**
         * Constructs a new CmdUserLoginReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUserLoginReply);

        /** CmdUserLoginReply uid. */
        public uid: number;

        /** CmdUserLoginReply token. */
        public token: string;

        /** CmdUserLoginReply addr. */
        public addr: string;

        /**
         * Creates a new CmdUserLoginReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUserLoginReply instance
         */
        public static create(properties?: pb.ICmdUserLoginReply): pb.CmdUserLoginReply;

        /**
         * Encodes the specified CmdUserLoginReply message. Does not implicitly {@link pb.CmdUserLoginReply.verify|verify} messages.
         * @param message CmdUserLoginReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUserLoginReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUserLoginReply message, length delimited. Does not implicitly {@link pb.CmdUserLoginReply.verify|verify} messages.
         * @param message CmdUserLoginReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUserLoginReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUserLoginReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUserLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUserLoginReply;

        /**
         * Decodes a CmdUserLoginReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUserLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUserLoginReply;

        /**
         * Verifies a CmdUserLoginReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUserLoginReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUserLoginReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUserLoginReply;

        /**
         * Creates a plain object from a CmdUserLoginReply message. Also converts values to other types if specified.
         * @param message CmdUserLoginReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUserLoginReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUserLoginReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUserGameLogin. */
    interface ICmdUserGameLogin {

        /** CmdUserGameLogin uid */
        uid?: (number|null);

        /** CmdUserGameLogin nodeId */
        nodeId?: (number|null);
    }

    /** Represents a CmdUserGameLogin. */
    class CmdUserGameLogin implements ICmdUserGameLogin {

        /**
         * Constructs a new CmdUserGameLogin.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUserGameLogin);

        /** CmdUserGameLogin uid. */
        public uid: number;

        /** CmdUserGameLogin nodeId. */
        public nodeId: number;

        /**
         * Creates a new CmdUserGameLogin instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUserGameLogin instance
         */
        public static create(properties?: pb.ICmdUserGameLogin): pb.CmdUserGameLogin;

        /**
         * Encodes the specified CmdUserGameLogin message. Does not implicitly {@link pb.CmdUserGameLogin.verify|verify} messages.
         * @param message CmdUserGameLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUserGameLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUserGameLogin message, length delimited. Does not implicitly {@link pb.CmdUserGameLogin.verify|verify} messages.
         * @param message CmdUserGameLogin message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUserGameLogin, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUserGameLogin message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUserGameLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUserGameLogin;

        /**
         * Decodes a CmdUserGameLogin message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUserGameLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUserGameLogin;

        /**
         * Verifies a CmdUserGameLogin message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUserGameLogin message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUserGameLogin
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUserGameLogin;

        /**
         * Creates a plain object from a CmdUserGameLogin message. Also converts values to other types if specified.
         * @param message CmdUserGameLogin
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUserGameLogin, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUserGameLogin to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUserGameLogout. */
    interface ICmdUserGameLogout {

        /** CmdUserGameLogout uid */
        uid?: (number|null);
    }

    /** Represents a CmdUserGameLogout. */
    class CmdUserGameLogout implements ICmdUserGameLogout {

        /**
         * Constructs a new CmdUserGameLogout.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUserGameLogout);

        /** CmdUserGameLogout uid. */
        public uid: number;

        /**
         * Creates a new CmdUserGameLogout instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUserGameLogout instance
         */
        public static create(properties?: pb.ICmdUserGameLogout): pb.CmdUserGameLogout;

        /**
         * Encodes the specified CmdUserGameLogout message. Does not implicitly {@link pb.CmdUserGameLogout.verify|verify} messages.
         * @param message CmdUserGameLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUserGameLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUserGameLogout message, length delimited. Does not implicitly {@link pb.CmdUserGameLogout.verify|verify} messages.
         * @param message CmdUserGameLogout message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUserGameLogout, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUserGameLogout message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUserGameLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUserGameLogout;

        /**
         * Decodes a CmdUserGameLogout message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUserGameLogout
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUserGameLogout;

        /**
         * Verifies a CmdUserGameLogout message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUserGameLogout message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUserGameLogout
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUserGameLogout;

        /**
         * Creates a plain object from a CmdUserGameLogout message. Also converts values to other types if specified.
         * @param message CmdUserGameLogout
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUserGameLogout, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUserGameLogout to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUserGameData. */
    interface ICmdUserGameData {

        /** CmdUserGameData uid */
        uid?: (number|null);
    }

    /** Represents a CmdUserGameData. */
    class CmdUserGameData implements ICmdUserGameData {

        /**
         * Constructs a new CmdUserGameData.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUserGameData);

        /** CmdUserGameData uid. */
        public uid: number;

        /**
         * Creates a new CmdUserGameData instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUserGameData instance
         */
        public static create(properties?: pb.ICmdUserGameData): pb.CmdUserGameData;

        /**
         * Encodes the specified CmdUserGameData message. Does not implicitly {@link pb.CmdUserGameData.verify|verify} messages.
         * @param message CmdUserGameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUserGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUserGameData message, length delimited. Does not implicitly {@link pb.CmdUserGameData.verify|verify} messages.
         * @param message CmdUserGameData message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUserGameData, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUserGameData message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUserGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUserGameData;

        /**
         * Decodes a CmdUserGameData message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUserGameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUserGameData;

        /**
         * Verifies a CmdUserGameData message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUserGameData message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUserGameData
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUserGameData;

        /**
         * Creates a plain object from a CmdUserGameData message. Also converts values to other types if specified.
         * @param message CmdUserGameData
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUserGameData, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUserGameData to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdUserGameDataReply. */
    interface ICmdUserGameDataReply {

        /** CmdUserGameDataReply gd */
        gd?: (pb.IGameData|null);

        /** CmdUserGameDataReply roomId */
        roomId?: (number|null);

        /** CmdUserGameDataReply roomAtNode */
        roomAtNode?: (number|null);
    }

    /** Represents a CmdUserGameDataReply. */
    class CmdUserGameDataReply implements ICmdUserGameDataReply {

        /**
         * Constructs a new CmdUserGameDataReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdUserGameDataReply);

        /** CmdUserGameDataReply gd. */
        public gd?: (pb.IGameData|null);

        /** CmdUserGameDataReply roomId. */
        public roomId: number;

        /** CmdUserGameDataReply roomAtNode. */
        public roomAtNode: number;

        /**
         * Creates a new CmdUserGameDataReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdUserGameDataReply instance
         */
        public static create(properties?: pb.ICmdUserGameDataReply): pb.CmdUserGameDataReply;

        /**
         * Encodes the specified CmdUserGameDataReply message. Does not implicitly {@link pb.CmdUserGameDataReply.verify|verify} messages.
         * @param message CmdUserGameDataReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdUserGameDataReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdUserGameDataReply message, length delimited. Does not implicitly {@link pb.CmdUserGameDataReply.verify|verify} messages.
         * @param message CmdUserGameDataReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdUserGameDataReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdUserGameDataReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdUserGameDataReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdUserGameDataReply;

        /**
         * Decodes a CmdUserGameDataReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdUserGameDataReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdUserGameDataReply;

        /**
         * Verifies a CmdUserGameDataReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdUserGameDataReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdUserGameDataReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdUserGameDataReply;

        /**
         * Creates a plain object from a CmdUserGameDataReply message. Also converts values to other types if specified.
         * @param message CmdUserGameDataReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdUserGameDataReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdUserGameDataReply to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdGameProperties. */
    interface ICmdGameProperties {

        /** CmdGameProperties uid */
        uid?: (number|null);

        /** CmdGameProperties properties */
        properties?: (pb.IGamePropertyItem[]|null);

        /** CmdGameProperties memo */
        memo?: (string|null);

        /** CmdGameProperties backbag */
        backbag?: (boolean|null);
    }

    /** Represents a CmdGameProperties. */
    class CmdGameProperties implements ICmdGameProperties {

        /**
         * Constructs a new CmdGameProperties.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGameProperties);

        /** CmdGameProperties uid. */
        public uid: number;

        /** CmdGameProperties properties. */
        public properties: pb.IGamePropertyItem[];

        /** CmdGameProperties memo. */
        public memo: string;

        /** CmdGameProperties backbag. */
        public backbag: boolean;

        /**
         * Creates a new CmdGameProperties instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGameProperties instance
         */
        public static create(properties?: pb.ICmdGameProperties): pb.CmdGameProperties;

        /**
         * Encodes the specified CmdGameProperties message. Does not implicitly {@link pb.CmdGameProperties.verify|verify} messages.
         * @param message CmdGameProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGameProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGameProperties message, length delimited. Does not implicitly {@link pb.CmdGameProperties.verify|verify} messages.
         * @param message CmdGameProperties message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGameProperties, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGameProperties message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGameProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGameProperties;

        /**
         * Decodes a CmdGameProperties message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGameProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGameProperties;

        /**
         * Verifies a CmdGameProperties message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGameProperties message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGameProperties
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGameProperties;

        /**
         * Creates a plain object from a CmdGameProperties message. Also converts values to other types if specified.
         * @param message CmdGameProperties
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGameProperties, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGameProperties to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a ServerCmd. */
    interface IServerCmd {

        /** ServerCmd id */
        id?: (pb.ServerCmdId|null);

        /** ServerCmd parameters */
        parameters?: (Uint8Array|null);
    }

    /** Represents a ServerCmd. */
    class ServerCmd implements IServerCmd {

        /**
         * Constructs a new ServerCmd.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IServerCmd);

        /** ServerCmd id. */
        public id: pb.ServerCmdId;

        /** ServerCmd parameters. */
        public parameters: Uint8Array;

        /**
         * Creates a new ServerCmd instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ServerCmd instance
         */
        public static create(properties?: pb.IServerCmd): pb.ServerCmd;

        /**
         * Encodes the specified ServerCmd message. Does not implicitly {@link pb.ServerCmd.verify|verify} messages.
         * @param message ServerCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IServerCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ServerCmd message, length delimited. Does not implicitly {@link pb.ServerCmd.verify|verify} messages.
         * @param message ServerCmd message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IServerCmd, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ServerCmd message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ServerCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.ServerCmd;

        /**
         * Decodes a ServerCmd message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ServerCmd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.ServerCmd;

        /**
         * Verifies a ServerCmd message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ServerCmd message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ServerCmd
         */
        public static fromObject(object: { [k: string]: any }): pb.ServerCmd;

        /**
         * Creates a plain object from a ServerCmd message. Also converts values to other types if specified.
         * @param message ServerCmd
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.ServerCmd, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ServerCmd to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Message. */
    interface IMessage {

        /** Message id */
        id?: (pb.MessageId|null);

        /** Message buf */
        buf?: (Uint8Array|null);
    }

    /** Represents a Message. */
    class Message implements IMessage {

        /**
         * Constructs a new Message.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMessage);

        /** Message id. */
        public id: pb.MessageId;

        /** Message buf. */
        public buf: Uint8Array;

        /**
         * Creates a new Message instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Message instance
         */
        public static create(properties?: pb.IMessage): pb.Message;

        /**
         * Encodes the specified Message message. Does not implicitly {@link pb.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Message message, length delimited. Does not implicitly {@link pb.Message.verify|verify} messages.
         * @param message Message message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMessage, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Message message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Message;

        /**
         * Decodes a Message message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Message
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Message;

        /**
         * Verifies a Message message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Message message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Message
         */
        public static fromObject(object: { [k: string]: any }): pb.Message;

        /**
         * Creates a plain object from a Message message. Also converts values to other types if specified.
         * @param message Message
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Message, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Message to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a Room. */
    interface IRoom {

        /** Room act */
        act?: (pb.SyncAct|null);

        /** Room id */
        id?: (number|null);

        /** Room game */
        game?: (pb.GameType|null);

        /** Room max */
        max?: (number|null);

        /** Room cur */
        cur?: (number|null);

        /** Room node */
        node?: (number|null);
    }

    /** Represents a Room. */
    class Room implements IRoom {

        /**
         * Constructs a new Room.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoom);

        /** Room act. */
        public act: pb.SyncAct;

        /** Room id. */
        public id: number;

        /** Room game. */
        public game: pb.GameType;

        /** Room max. */
        public max: number;

        /** Room cur. */
        public cur: number;

        /** Room node. */
        public node: number;

        /**
         * Creates a new Room instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Room instance
         */
        public static create(properties?: pb.IRoom): pb.Room;

        /**
         * Encodes the specified Room message. Does not implicitly {@link pb.Room.verify|verify} messages.
         * @param message Room message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Room message, length delimited. Does not implicitly {@link pb.Room.verify|verify} messages.
         * @param message Room message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoom, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Room message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Room
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Room;

        /**
         * Decodes a Room message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Room
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Room;

        /**
         * Verifies a Room message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Room message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Room
         */
        public static fromObject(object: { [k: string]: any }): pb.Room;

        /**
         * Creates a plain object from a Room message. Also converts values to other types if specified.
         * @param message Room
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Room, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Room to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomList. */
    interface IRoomList {

        /** RoomList items */
        items?: (pb.IRoom[]|null);
    }

    /** Represents a RoomList. */
    class RoomList implements IRoomList {

        /**
         * Constructs a new RoomList.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomList);

        /** RoomList items. */
        public items: pb.IRoom[];

        /**
         * Creates a new RoomList instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomList instance
         */
        public static create(properties?: pb.IRoomList): pb.RoomList;

        /**
         * Encodes the specified RoomList message. Does not implicitly {@link pb.RoomList.verify|verify} messages.
         * @param message RoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomList message, length delimited. Does not implicitly {@link pb.RoomList.verify|verify} messages.
         * @param message RoomList message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomList, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomList message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomList;

        /**
         * Decodes a RoomList message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomList
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomList;

        /**
         * Verifies a RoomList message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomList message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomList
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomList;

        /**
         * Creates a plain object from a RoomList message. Also converts values to other types if specified.
         * @param message RoomList
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomList, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomList to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a PlayerNode. */
    interface IPlayerNode {

        /** PlayerNode uid */
        uid?: (number|null);

        /** PlayerNode nodeId */
        nodeId?: (number|null);
    }

    /** Represents a PlayerNode. */
    class PlayerNode implements IPlayerNode {

        /**
         * Constructs a new PlayerNode.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IPlayerNode);

        /** PlayerNode uid. */
        public uid: number;

        /** PlayerNode nodeId. */
        public nodeId: number;

        /**
         * Creates a new PlayerNode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns PlayerNode instance
         */
        public static create(properties?: pb.IPlayerNode): pb.PlayerNode;

        /**
         * Encodes the specified PlayerNode message. Does not implicitly {@link pb.PlayerNode.verify|verify} messages.
         * @param message PlayerNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IPlayerNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified PlayerNode message, length delimited. Does not implicitly {@link pb.PlayerNode.verify|verify} messages.
         * @param message PlayerNode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IPlayerNode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a PlayerNode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns PlayerNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.PlayerNode;

        /**
         * Decodes a PlayerNode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns PlayerNode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.PlayerNode;

        /**
         * Verifies a PlayerNode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a PlayerNode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns PlayerNode
         */
        public static fromObject(object: { [k: string]: any }): pb.PlayerNode;

        /**
         * Creates a plain object from a PlayerNode message. Also converts values to other types if specified.
         * @param message PlayerNode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.PlayerNode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this PlayerNode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a BroadcastMsg. */
    interface IBroadcastMsg {

        /** BroadcastMsg id */
        id?: (pb.MessageId|null);

        /** BroadcastMsg buf */
        buf?: (Uint8Array|null);

        /** BroadcastMsg uids */
        uids?: (number[]|null);
    }

    /** Represents a BroadcastMsg. */
    class BroadcastMsg implements IBroadcastMsg {

        /**
         * Constructs a new BroadcastMsg.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IBroadcastMsg);

        /** BroadcastMsg id. */
        public id: pb.MessageId;

        /** BroadcastMsg buf. */
        public buf: Uint8Array;

        /** BroadcastMsg uids. */
        public uids: number[];

        /**
         * Creates a new BroadcastMsg instance using the specified properties.
         * @param [properties] Properties to set
         * @returns BroadcastMsg instance
         */
        public static create(properties?: pb.IBroadcastMsg): pb.BroadcastMsg;

        /**
         * Encodes the specified BroadcastMsg message. Does not implicitly {@link pb.BroadcastMsg.verify|verify} messages.
         * @param message BroadcastMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IBroadcastMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified BroadcastMsg message, length delimited. Does not implicitly {@link pb.BroadcastMsg.verify|verify} messages.
         * @param message BroadcastMsg message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IBroadcastMsg, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a BroadcastMsg message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns BroadcastMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.BroadcastMsg;

        /**
         * Decodes a BroadcastMsg message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns BroadcastMsg
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.BroadcastMsg;

        /**
         * Verifies a BroadcastMsg message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a BroadcastMsg message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns BroadcastMsg
         */
        public static fromObject(object: { [k: string]: any }): pb.BroadcastMsg;

        /**
         * Creates a plain object from a BroadcastMsg message. Also converts values to other types if specified.
         * @param message BroadcastMsg
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.BroadcastMsg, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this BroadcastMsg to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdCgsConf. */
    interface ICmdCgsConf {

        /** CmdCgsConf id */
        id?: (number|null);

        /** CmdCgsConf awardJson */
        awardJson?: (string|null);
    }

    /** Represents a CmdCgsConf. */
    class CmdCgsConf implements ICmdCgsConf {

        /**
         * Constructs a new CmdCgsConf.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdCgsConf);

        /** CmdCgsConf id. */
        public id: number;

        /** CmdCgsConf awardJson. */
        public awardJson: string;

        /**
         * Creates a new CmdCgsConf instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdCgsConf instance
         */
        public static create(properties?: pb.ICmdCgsConf): pb.CmdCgsConf;

        /**
         * Encodes the specified CmdCgsConf message. Does not implicitly {@link pb.CmdCgsConf.verify|verify} messages.
         * @param message CmdCgsConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdCgsConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdCgsConf message, length delimited. Does not implicitly {@link pb.CmdCgsConf.verify|verify} messages.
         * @param message CmdCgsConf message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdCgsConf, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdCgsConf message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdCgsConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdCgsConf;

        /**
         * Decodes a CmdCgsConf message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdCgsConf
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdCgsConf;

        /**
         * Verifies a CmdCgsConf message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdCgsConf message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdCgsConf
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdCgsConf;

        /**
         * Creates a plain object from a CmdCgsConf message. Also converts values to other types if specified.
         * @param message CmdCgsConf
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdCgsConf, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdCgsConf to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Represents a MasterService */
    class MasterService extends $protobuf.rpc.Service {

        /**
         * Constructs a new MasterService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new MasterService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): MasterService;

        /**
         * Calls NewUid.
         * @param request VoidRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdNewUidReply
         */
        public newUid(request: pb.IVoidRequest, callback: pb.MasterService.NewUidCallback): void;

        /**
         * Calls NewUid.
         * @param request VoidRequest message or plain object
         * @returns Promise
         */
        public newUid(request: pb.IVoidRequest): Promise<pb.CmdNewUidReply>;

        /**
         * Calls GetGateAddr.
         * @param request CmdGateAddr message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdGateAddrReply
         */
        public getGateAddr(request: pb.ICmdGateAddr, callback: pb.MasterService.GetGateAddrCallback): void;

        /**
         * Calls GetGateAddr.
         * @param request CmdGateAddr message or plain object
         * @returns Promise
         */
        public getGateAddr(request: pb.ICmdGateAddr): Promise<pb.CmdGateAddrReply>;

        /**
         * Calls UserLogin.
         * @param request CmdUserLogin message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdUserLoginReply
         */
        public userLogin(request: pb.ICmdUserLogin, callback: pb.MasterService.UserLoginCallback): void;

        /**
         * Calls UserLogin.
         * @param request CmdUserLogin message or plain object
         * @returns Promise
         */
        public userLogin(request: pb.ICmdUserLogin): Promise<pb.CmdUserLoginReply>;

        /**
         * Calls UserGameLogin.
         * @param request CmdUserGameLogin message or plain object
         * @param callback Node-style callback called with the error, if any, and VoidReply
         */
        public userGameLogin(request: pb.ICmdUserGameLogin, callback: pb.MasterService.UserGameLoginCallback): void;

        /**
         * Calls UserGameLogin.
         * @param request CmdUserGameLogin message or plain object
         * @returns Promise
         */
        public userGameLogin(request: pb.ICmdUserGameLogin): Promise<pb.VoidReply>;

        /**
         * Calls UserGameLogout.
         * @param request CmdUserGameLogout message or plain object
         * @param callback Node-style callback called with the error, if any, and VoidReply
         */
        public userGameLogout(request: pb.ICmdUserGameLogout, callback: pb.MasterService.UserGameLogoutCallback): void;

        /**
         * Calls UserGameLogout.
         * @param request CmdUserGameLogout message or plain object
         * @returns Promise
         */
        public userGameLogout(request: pb.ICmdUserGameLogout): Promise<pb.VoidReply>;

        /**
         * Calls NewRoomId.
         * @param request VoidRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdNewRoomIdReply
         */
        public newRoomId(request: pb.IVoidRequest, callback: pb.MasterService.NewRoomIdCallback): void;

        /**
         * Calls NewRoomId.
         * @param request VoidRequest message or plain object
         * @returns Promise
         */
        public newRoomId(request: pb.IVoidRequest): Promise<pb.CmdNewRoomIdReply>;

        /**
         * Calls SyncRooms.
         * @param request RoomList message or plain object
         * @param callback Node-style callback called with the error, if any, and VoidReply
         */
        public syncRooms(request: pb.IRoomList, callback: pb.MasterService.SyncRoomsCallback): void;

        /**
         * Calls SyncRooms.
         * @param request RoomList message or plain object
         * @returns Promise
         */
        public syncRooms(request: pb.IRoomList): Promise<pb.VoidReply>;

        /**
         * Calls EnterRoom.
         * @param request CmdRoomEnter message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdRoomEnterReply
         */
        public enterRoom(request: pb.ICmdRoomEnter, callback: pb.MasterService.EnterRoomCallback): void;

        /**
         * Calls EnterRoom.
         * @param request CmdRoomEnter message or plain object
         * @returns Promise
         */
        public enterRoom(request: pb.ICmdRoomEnter): Promise<pb.CmdRoomEnterReply>;

        /**
         * Calls HeartBeat.
         * @param request VoidRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and VoidReply
         */
        public heartBeat(request: pb.IVoidRequest, callback: pb.MasterService.HeartBeatCallback): void;

        /**
         * Calls HeartBeat.
         * @param request VoidRequest message or plain object
         * @returns Promise
         */
        public heartBeat(request: pb.IVoidRequest): Promise<pb.VoidReply>;
    }

    namespace MasterService {

        /**
         * Callback as used by {@link pb.MasterService#newUid}.
         * @param error Error, if any
         * @param [response] CmdNewUidReply
         */
        type NewUidCallback = (error: (Error|null), response?: pb.CmdNewUidReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#getGateAddr}.
         * @param error Error, if any
         * @param [response] CmdGateAddrReply
         */
        type GetGateAddrCallback = (error: (Error|null), response?: pb.CmdGateAddrReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#userLogin}.
         * @param error Error, if any
         * @param [response] CmdUserLoginReply
         */
        type UserLoginCallback = (error: (Error|null), response?: pb.CmdUserLoginReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#userGameLogin}.
         * @param error Error, if any
         * @param [response] VoidReply
         */
        type UserGameLoginCallback = (error: (Error|null), response?: pb.VoidReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#userGameLogout}.
         * @param error Error, if any
         * @param [response] VoidReply
         */
        type UserGameLogoutCallback = (error: (Error|null), response?: pb.VoidReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#newRoomId}.
         * @param error Error, if any
         * @param [response] CmdNewRoomIdReply
         */
        type NewRoomIdCallback = (error: (Error|null), response?: pb.CmdNewRoomIdReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#syncRooms}.
         * @param error Error, if any
         * @param [response] VoidReply
         */
        type SyncRoomsCallback = (error: (Error|null), response?: pb.VoidReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#enterRoom}.
         * @param error Error, if any
         * @param [response] CmdRoomEnterReply
         */
        type EnterRoomCallback = (error: (Error|null), response?: pb.CmdRoomEnterReply) => void;

        /**
         * Callback as used by {@link pb.MasterService#heartBeat}.
         * @param error Error, if any
         * @param [response] VoidReply
         */
        type HeartBeatCallback = (error: (Error|null), response?: pb.VoidReply) => void;
    }

    /** Represents a GameService */
    class GameService extends $protobuf.rpc.Service {

        /**
         * Constructs a new GameService service.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         */
        constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

        /**
         * Creates new GameService service using the specified rpc implementation.
         * @param rpcImpl RPC implementation
         * @param [requestDelimited=false] Whether requests are length-delimited
         * @param [responseDelimited=false] Whether responses are length-delimited
         * @returns RPC service. Useful where requests and/or responses are streamed.
         */
        public static create(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean): GameService;

        /**
         * Calls GetGameData.
         * @param request CmdUserGameData message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdUserGameDataReply
         */
        public getGameData(request: pb.ICmdUserGameData, callback: pb.GameService.GetGameDataCallback): void;

        /**
         * Calls GetGameData.
         * @param request CmdUserGameData message or plain object
         * @returns Promise
         */
        public getGameData(request: pb.ICmdUserGameData): Promise<pb.CmdUserGameDataReply>;

        /**
         * Calls AddGameProperties.
         * @param request CmdGameProperties message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public addGameProperties(request: pb.ICmdGameProperties, callback: pb.GameService.AddGamePropertiesCallback): void;

        /**
         * Calls AddGameProperties.
         * @param request CmdGameProperties message or plain object
         * @returns Promise
         */
        public addGameProperties(request: pb.ICmdGameProperties): Promise<pb.ErrorInfo>;

        /**
         * Calls ResetGameProperties.
         * @param request CmdGameProperties message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public resetGameProperties(request: pb.ICmdGameProperties, callback: pb.GameService.ResetGamePropertiesCallback): void;

        /**
         * Calls ResetGameProperties.
         * @param request CmdGameProperties message or plain object
         * @returns Promise
         */
        public resetGameProperties(request: pb.ICmdGameProperties): Promise<pb.ErrorInfo>;

        /**
         * Calls OpenCgs.
         * @param request CmdCgsConf message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public openCgs(request: pb.ICmdCgsConf, callback: pb.GameService.OpenCgsCallback): void;

        /**
         * Calls OpenCgs.
         * @param request CmdCgsConf message or plain object
         * @returns Promise
         */
        public openCgs(request: pb.ICmdCgsConf): Promise<pb.ErrorInfo>;

        /**
         * Calls CloseCgs.
         * @param request CmdCgsConf message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public closeCgs(request: pb.ICmdCgsConf, callback: pb.GameService.CloseCgsCallback): void;

        /**
         * Calls CloseCgs.
         * @param request CmdCgsConf message or plain object
         * @returns Promise
         */
        public closeCgs(request: pb.ICmdCgsConf): Promise<pb.ErrorInfo>;

        /**
         * Calls SetCgsAward.
         * @param request CmdCgsConf message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public setCgsAward(request: pb.ICmdCgsConf, callback: pb.GameService.SetCgsAwardCallback): void;

        /**
         * Calls SetCgsAward.
         * @param request CmdCgsConf message or plain object
         * @returns Promise
         */
        public setCgsAward(request: pb.ICmdCgsConf): Promise<pb.ErrorInfo>;

        /**
         * Calls Execute.
         * @param request ServerCmd message or plain object
         * @param callback Node-style callback called with the error, if any, and ErrorInfo
         */
        public execute(request: pb.IServerCmd, callback: pb.GameService.ExecuteCallback): void;

        /**
         * Calls Execute.
         * @param request ServerCmd message or plain object
         * @returns Promise
         */
        public execute(request: pb.IServerCmd): Promise<pb.ErrorInfo>;

        /**
         * Calls Process.
         * @param request Message message or plain object
         * @param callback Node-style callback called with the error, if any, and Message
         */
        public process(request: pb.IMessage, callback: pb.GameService.ProcessCallback): void;

        /**
         * Calls Process.
         * @param request Message message or plain object
         * @returns Promise
         */
        public process(request: pb.IMessage): Promise<pb.Message>;

        /**
         * Calls SendMessage.
         * @param request Message message or plain object
         * @param callback Node-style callback called with the error, if any, and VoidReply
         */
        public sendMessage(request: pb.IMessage, callback: pb.GameService.SendMessageCallback): void;

        /**
         * Calls SendMessage.
         * @param request Message message or plain object
         * @returns Promise
         */
        public sendMessage(request: pb.IMessage): Promise<pb.VoidReply>;

        /**
         * Calls SyncRooms.
         * @param request VoidRequest message or plain object
         * @param callback Node-style callback called with the error, if any, and RoomList
         */
        public syncRooms(request: pb.IVoidRequest, callback: pb.GameService.SyncRoomsCallback): void;

        /**
         * Calls SyncRooms.
         * @param request VoidRequest message or plain object
         * @returns Promise
         */
        public syncRooms(request: pb.IVoidRequest): Promise<pb.RoomList>;

        /**
         * Calls ForwardRoomMsg.
         * @param request Message message or plain object
         * @param callback Node-style callback called with the error, if any, and Message
         */
        public forwardRoomMsg(request: pb.IMessage, callback: pb.GameService.ForwardRoomMsgCallback): void;

        /**
         * Calls ForwardRoomMsg.
         * @param request Message message or plain object
         * @returns Promise
         */
        public forwardRoomMsg(request: pb.IMessage): Promise<pb.Message>;

        /**
         * Calls CreateRoom.
         * @param request CmdRoomCreate message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdRoomCreateReply
         */
        public createRoom(request: pb.ICmdRoomCreate, callback: pb.GameService.CreateRoomCallback): void;

        /**
         * Calls CreateRoom.
         * @param request CmdRoomCreate message or plain object
         * @returns Promise
         */
        public createRoom(request: pb.ICmdRoomCreate): Promise<pb.CmdRoomCreateReply>;

        /**
         * Calls EnterRoom.
         * @param request CmdRoomEnter message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdRoomEnterReply
         */
        public enterRoom(request: pb.ICmdRoomEnter, callback: pb.GameService.EnterRoomCallback): void;

        /**
         * Calls EnterRoom.
         * @param request CmdRoomEnter message or plain object
         * @returns Promise
         */
        public enterRoom(request: pb.ICmdRoomEnter): Promise<pb.CmdRoomEnterReply>;

        /**
         * Calls LeaveRoom.
         * @param request CmdRoomLeave message or plain object
         * @param callback Node-style callback called with the error, if any, and CmdRoomLeaveReply
         */
        public leaveRoom(request: pb.ICmdRoomLeave, callback: pb.GameService.LeaveRoomCallback): void;

        /**
         * Calls LeaveRoom.
         * @param request CmdRoomLeave message or plain object
         * @returns Promise
         */
        public leaveRoom(request: pb.ICmdRoomLeave): Promise<pb.CmdRoomLeaveReply>;
    }

    namespace GameService {

        /**
         * Callback as used by {@link pb.GameService#getGameData}.
         * @param error Error, if any
         * @param [response] CmdUserGameDataReply
         */
        type GetGameDataCallback = (error: (Error|null), response?: pb.CmdUserGameDataReply) => void;

        /**
         * Callback as used by {@link pb.GameService#addGameProperties}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type AddGamePropertiesCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.GameService#resetGameProperties}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type ResetGamePropertiesCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.GameService#openCgs}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type OpenCgsCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.GameService#closeCgs}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type CloseCgsCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.GameService#setCgsAward}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type SetCgsAwardCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.GameService#execute}.
         * @param error Error, if any
         * @param [response] ErrorInfo
         */
        type ExecuteCallback = (error: (Error|null), response?: pb.ErrorInfo) => void;

        /**
         * Callback as used by {@link pb.GameService#process}.
         * @param error Error, if any
         * @param [response] Message
         */
        type ProcessCallback = (error: (Error|null), response?: pb.Message) => void;

        /**
         * Callback as used by {@link pb.GameService#sendMessage}.
         * @param error Error, if any
         * @param [response] VoidReply
         */
        type SendMessageCallback = (error: (Error|null), response?: pb.VoidReply) => void;

        /**
         * Callback as used by {@link pb.GameService#syncRooms}.
         * @param error Error, if any
         * @param [response] RoomList
         */
        type SyncRoomsCallback = (error: (Error|null), response?: pb.RoomList) => void;

        /**
         * Callback as used by {@link pb.GameService#forwardRoomMsg}.
         * @param error Error, if any
         * @param [response] Message
         */
        type ForwardRoomMsgCallback = (error: (Error|null), response?: pb.Message) => void;

        /**
         * Callback as used by {@link pb.GameService#createRoom}.
         * @param error Error, if any
         * @param [response] CmdRoomCreateReply
         */
        type CreateRoomCallback = (error: (Error|null), response?: pb.CmdRoomCreateReply) => void;

        /**
         * Callback as used by {@link pb.GameService#enterRoom}.
         * @param error Error, if any
         * @param [response] CmdRoomEnterReply
         */
        type EnterRoomCallback = (error: (Error|null), response?: pb.CmdRoomEnterReply) => void;

        /**
         * Callback as used by {@link pb.GameService#leaveRoom}.
         * @param error Error, if any
         * @param [response] CmdRoomLeaveReply
         */
        type LeaveRoomCallback = (error: (Error|null), response?: pb.CmdRoomLeaveReply) => void;
    }
}
