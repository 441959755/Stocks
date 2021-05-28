import * as $protobuf from "protobufjs";
/** Namespace pb. */
export namespace pb {

    /** Constant enum. */
    enum Constant {
        Constant_NULL = 0,
        MsgHead_Len = 10,
        MsgMaxBody_Len = 1024000
    }

    /** AppPlantForm enum. */
    enum AppPlantForm {
        AppPlantForm_NULL = 0,
        WechatMinProgram = 1,
        Ios = 11,
        Android = 21
    }

    /** AdPosition enum. */
    enum AdPosition {
        AdPosition_NULL = 0,
        StartUp = 1,
        Main = 11
    }

    /** AppFrom enum. */
    enum AppFrom {
        Android_000 = 0,
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
        IosAppleStore = 6666,
        Ipad = 6667,
        WebsiteIos = 7777,
        WebsiteAndriod = 7778,
        WeChatMinProgram = 8888
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
        Sync_S2C_GameCgds = 1010,
        Sync_S2C_GameMncg = 1012,
        Sync_S2C_Broadcast = 1014,
        Sync_S2C_GameCg_GD = 1016,
        Sync_S2C_GameTimes = 1018,
        Sync_C2S_GameHeart = 1200,
        Sync_Email = 1300,
        Req_QuoteSubscribe = 2001,
        Rep_QuoteSubscribe = 2002,
        Req_QuoteQuery = 2003,
        Rep_QuoteQuery = 2004,
        Req_QuoteEdit = 2005,
        Req_StockEdit = 2007,
        Req_QuoteQueryFuture = 2009,
        Rep_QuoteQueryFuture = 2010,
        Req_Hall_UploadIcon = 3001,
        Rep_Hall_UploadIcon = 3002,
        Req_Hall_EditNick = 3003,
        Rep_Hall_EditNick = 3004,
        Req_Hall_EditIcon = 3005,
        Rep_Hall_EditIcon = 3006,
        Req_Hall_BackBag = 3007,
        Rep_Hall_BackBag = 3008,
        Req_Hall_GetItem = 3009,
        Rep_Hall_GetItem = 3010,
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
        RoomMsgRange_BEG = 5000,
        RoomMsgRange_END = 5999,
        Req_Room_Create = 5003,
        Rep_Room_Create = 5004,
        Req_Room_Enter = 5005,
        Rep_Room_Enter = 5006,
        Req_Room_Leave = 5007,
        Rep_Room_Leave = 5008,
        Req_Room_Ready = 5009,
        Rep_Room_Ready = 5010,
        Req_Room_GameStart = 5011,
        Rep_Room_GameStart = 5012,
        Req_Room_GameOp = 5013,
        Rep_Room_GameOp = 5014,
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
        S2S_Update_PlayerGameCounter = 10005
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
        CS_ROOM_INVALID = 100,
        CS_ROOM_FULL = 101,
        CS_ROOM_FAIL_CHECKIN = 102,
        CS_ROOM_NOT_READY = 103
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

    /** Properties of an AdClicked. */
    interface IAdClicked {

        /** AdClicked uid */
        uid?: (number|null);

        /** AdClicked pos */
        pos?: (number|null);

        /** AdClicked url */
        url?: (string|null);

        /** AdClicked from */
        from?: (pb.AppFrom|null);

        /** AdClicked ua */
        ua?: (string|null);
    }

    /** Represents an AdClicked. */
    class AdClicked implements IAdClicked {

        /**
         * Constructs a new AdClicked.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IAdClicked);

        /** AdClicked uid. */
        public uid: number;

        /** AdClicked pos. */
        public pos: number;

        /** AdClicked url. */
        public url: string;

        /** AdClicked from. */
        public from: pb.AppFrom;

        /** AdClicked ua. */
        public ua: string;

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

    /** MessageType enum. */
    enum MessageType {
        MessageType_NULL = 0,
        Notice = 1,
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
        ZhiBiao = 17,
        TiaoJianDan = 11,
        QiHuo = 6,
        JJ_PK = 1,
        JJ_DuoKong = 2,
        JJ_ChuangGuan = 16,
        JJ_QiHuo = 15,
        MoNiChaoGu = 10,
        ChaoGuDaSai = 9,
        GeGuJingChai = 7,
        DaPanJingChai = 8,
        MaxGameType = 30
    }

    /** GamePropertyId enum. */
    enum GamePropertyId {
        Gold = 0,
        Diamond = 1,
        VIP = 2,
        Exp = 3,
        Level = 4,
        Fame = 5,
        Max = 30
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
        Long = 8,
        Short = 9,
        Close_Force = 10,
        END = 150
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

        /** TodayGameTimes ts */
        ts?: (number|Long|null);

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

        /** TodayGameTimes ts. */
        public ts: (number|Long);

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

    /** Properties of a CgdsState. */
    interface ICgdsState {
    }

    /** Represents a CgdsState. */
    class CgdsState implements ICgdsState {

        /**
         * Constructs a new CgdsState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICgdsState);

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

    /** Properties of a MncgState. */
    interface IMncgState {
    }

    /** Represents a MncgState. */
    class MncgState implements IMncgState {

        /**
         * Constructs a new MncgState.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMncgState);

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

        /** GameData cgdsState */
        cgdsState?: (pb.ICgdsState|null);

        /** GameData mncgState */
        mncgState?: (pb.IMncgState|null);

        /** GameData todayTs */
        todayTs?: (number|Long|null);

        /** GameData todayTimes */
        todayTimes?: (number[]|null);
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

        /** GameData cgdsState. */
        public cgdsState?: (pb.ICgdsState|null);

        /** GameData mncgState. */
        public mncgState?: (pb.IMncgState|null);

        /** GameData todayTs. */
        public todayTs: (number|Long);

        /** GameData todayTimes. */
        public todayTimes: number[];

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

    /** Properties of a CmdEditNick. */
    interface ICmdEditNick {

        /** CmdEditNick uid */
        uid?: (number|null);

        /** CmdEditNick nick */
        nick?: (string|null);
    }

    /** Represents a CmdEditNick. */
    class CmdEditNick implements ICmdEditNick {

        /**
         * Constructs a new CmdEditNick.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdEditNick);

        /** CmdEditNick uid. */
        public uid: number;

        /** CmdEditNick nick. */
        public nick: string;

        /**
         * Creates a new CmdEditNick instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdEditNick instance
         */
        public static create(properties?: pb.ICmdEditNick): pb.CmdEditNick;

        /**
         * Encodes the specified CmdEditNick message. Does not implicitly {@link pb.CmdEditNick.verify|verify} messages.
         * @param message CmdEditNick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdEditNick, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdEditNick message, length delimited. Does not implicitly {@link pb.CmdEditNick.verify|verify} messages.
         * @param message CmdEditNick message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdEditNick, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdEditNick message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdEditNick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdEditNick;

        /**
         * Decodes a CmdEditNick message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdEditNick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdEditNick;

        /**
         * Verifies a CmdEditNick message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdEditNick message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdEditNick
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdEditNick;

        /**
         * Creates a plain object from a CmdEditNick message. Also converts values to other types if specified.
         * @param message CmdEditNick
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdEditNick, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdEditNick to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a CmdEditIcon. */
    interface ICmdEditIcon {

        /** CmdEditIcon uid */
        uid?: (number|null);

        /** CmdEditIcon icon */
        icon?: (string|null);
    }

    /** Represents a CmdEditIcon. */
    class CmdEditIcon implements ICmdEditIcon {

        /**
         * Constructs a new CmdEditIcon.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdEditIcon);

        /** CmdEditIcon uid. */
        public uid: number;

        /** CmdEditIcon icon. */
        public icon: string;

        /**
         * Creates a new CmdEditIcon instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdEditIcon instance
         */
        public static create(properties?: pb.ICmdEditIcon): pb.CmdEditIcon;

        /**
         * Encodes the specified CmdEditIcon message. Does not implicitly {@link pb.CmdEditIcon.verify|verify} messages.
         * @param message CmdEditIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdEditIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdEditIcon message, length delimited. Does not implicitly {@link pb.CmdEditIcon.verify|verify} messages.
         * @param message CmdEditIcon message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdEditIcon, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdEditIcon message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdEditIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdEditIcon;

        /**
         * Decodes a CmdEditIcon message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdEditIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdEditIcon;

        /**
         * Verifies a CmdEditIcon message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdEditIcon message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdEditIcon
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdEditIcon;

        /**
         * Creates a plain object from a CmdEditIcon message. Also converts values to other types if specified.
         * @param message CmdEditIcon
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdEditIcon, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdEditIcon to JSON.
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

    /** Properties of a CmdGameStart. */
    interface ICmdGameStart {

        /** CmdGameStart game */
        game?: (pb.GameType|null);
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

    /** Properties of a CmdQueryGameResult. */
    interface ICmdQueryGameResult {

        /** CmdQueryGameResult gType */
        gType?: (pb.GameType|null);

        /** CmdQueryGameResult from */
        from?: (number|Long|null);

        /** CmdQueryGameResult to */
        to?: (number|Long|null);

        /** CmdQueryGameResult pageSize */
        pageSize?: (number|null);
    }

    /** Represents a CmdQueryGameResult. */
    class CmdQueryGameResult implements ICmdQueryGameResult {

        /**
         * Constructs a new CmdQueryGameResult.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdQueryGameResult);

        /** CmdQueryGameResult gType. */
        public gType: pb.GameType;

        /** CmdQueryGameResult from. */
        public from: (number|Long);

        /** CmdQueryGameResult to. */
        public to: (number|Long);

        /** CmdQueryGameResult pageSize. */
        public pageSize: number;

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

    /** Properties of a CmdGetGameOperationsReply. */
    interface ICmdGetGameOperationsReply {

        /** CmdGetGameOperationsReply err */
        err?: (pb.IErrorInfo|null);

        /** CmdGetGameOperationsReply operations */
        operations?: (pb.IGameOperations|null);
    }

    /** Represents a CmdGetGameOperationsReply. */
    class CmdGetGameOperationsReply implements ICmdGetGameOperationsReply {

        /**
         * Constructs a new CmdGetGameOperationsReply.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ICmdGetGameOperationsReply);

        /** CmdGetGameOperationsReply err. */
        public err?: (pb.IErrorInfo|null);

        /** CmdGetGameOperationsReply operations. */
        public operations?: (pb.IGameOperations|null);

        /**
         * Creates a new CmdGetGameOperationsReply instance using the specified properties.
         * @param [properties] Properties to set
         * @returns CmdGetGameOperationsReply instance
         */
        public static create(properties?: pb.ICmdGetGameOperationsReply): pb.CmdGetGameOperationsReply;

        /**
         * Encodes the specified CmdGetGameOperationsReply message. Does not implicitly {@link pb.CmdGetGameOperationsReply.verify|verify} messages.
         * @param message CmdGetGameOperationsReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ICmdGetGameOperationsReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified CmdGetGameOperationsReply message, length delimited. Does not implicitly {@link pb.CmdGetGameOperationsReply.verify|verify} messages.
         * @param message CmdGetGameOperationsReply message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ICmdGetGameOperationsReply, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a CmdGetGameOperationsReply message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns CmdGetGameOperationsReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.CmdGetGameOperationsReply;

        /**
         * Decodes a CmdGetGameOperationsReply message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns CmdGetGameOperationsReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.CmdGetGameOperationsReply;

        /**
         * Verifies a CmdGetGameOperationsReply message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a CmdGetGameOperationsReply message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns CmdGetGameOperationsReply
         */
        public static fromObject(object: { [k: string]: any }): pb.CmdGetGameOperationsReply;

        /**
         * Creates a plain object from a CmdGetGameOperationsReply message. Also converts values to other types if specified.
         * @param message CmdGetGameOperationsReply
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.CmdGetGameOperationsReply, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this CmdGetGameOperationsReply to JSON.
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

    /** Properties of a RoomPkPlayer. */
    interface IRoomPkPlayer {

        /** RoomPkPlayer gd */
        gd?: (pb.IGameData|null);

        /** RoomPkPlayer ready */
        ready?: (boolean|null);

        /** RoomPkPlayer giveup */
        giveup?: (boolean|null);

        /** RoomPkPlayer ops */
        ops?: (pb.IGameOperations|null);

        /** RoomPkPlayer result */
        result?: (pb.IGameResult|null);

        /** RoomPkPlayer curPos */
        curPos?: (number|Long|null);
    }

    /** Represents a RoomPkPlayer. */
    class RoomPkPlayer implements IRoomPkPlayer {

        /**
         * Constructs a new RoomPkPlayer.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomPkPlayer);

        /** RoomPkPlayer gd. */
        public gd?: (pb.IGameData|null);

        /** RoomPkPlayer ready. */
        public ready: boolean;

        /** RoomPkPlayer giveup. */
        public giveup: boolean;

        /** RoomPkPlayer ops. */
        public ops?: (pb.IGameOperations|null);

        /** RoomPkPlayer result. */
        public result?: (pb.IGameResult|null);

        /** RoomPkPlayer curPos. */
        public curPos: (number|Long);

        /**
         * Creates a new RoomPkPlayer instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomPkPlayer instance
         */
        public static create(properties?: pb.IRoomPkPlayer): pb.RoomPkPlayer;

        /**
         * Encodes the specified RoomPkPlayer message. Does not implicitly {@link pb.RoomPkPlayer.verify|verify} messages.
         * @param message RoomPkPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomPkPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomPkPlayer message, length delimited. Does not implicitly {@link pb.RoomPkPlayer.verify|verify} messages.
         * @param message RoomPkPlayer message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomPkPlayer, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomPkPlayer message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomPkPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomPkPlayer;

        /**
         * Decodes a RoomPkPlayer message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomPkPlayer
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomPkPlayer;

        /**
         * Verifies a RoomPkPlayer message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomPkPlayer message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomPkPlayer
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomPkPlayer;

        /**
         * Creates a plain object from a RoomPkPlayer message. Also converts values to other types if specified.
         * @param message RoomPkPlayer
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomPkPlayer, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomPkPlayer to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a RoomDataPk. */
    interface IRoomDataPk {

        /** RoomDataPk status */
        status?: (number|null);

        /** RoomDataPk capital */
        capital?: (number|null);

        /** RoomDataPk code */
        code?: (number|null);

        /** RoomDataPk ktype */
        ktype?: (pb.KType|null);

        /** RoomDataPk tsQuoteFrom */
        tsQuoteFrom?: (number|Long|null);

        /** RoomDataPk tsQuoteTo */
        tsQuoteTo?: (number|Long|null);

        /** RoomDataPk tsQuoteStart */
        tsQuoteStart?: (number|Long|null);

        /** RoomDataPk players */
        players?: (pb.IRoomPkPlayer[]|null);

        /** RoomDataPk tsGameFrom */
        tsGameFrom?: (number|Long|null);

        /** RoomDataPk tsGameCur */
        tsGameCur?: (number|Long|null);

        /** RoomDataPk quotes */
        quotes?: (pb.IQuotes|null);

        /** RoomDataPk quotesFuture */
        quotesFuture?: (pb.IQuotesFuture|null);
    }

    /** Represents a RoomDataPk. */
    class RoomDataPk implements IRoomDataPk {

        /**
         * Constructs a new RoomDataPk.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IRoomDataPk);

        /** RoomDataPk status. */
        public status: number;

        /** RoomDataPk capital. */
        public capital: number;

        /** RoomDataPk code. */
        public code: number;

        /** RoomDataPk ktype. */
        public ktype: pb.KType;

        /** RoomDataPk tsQuoteFrom. */
        public tsQuoteFrom: (number|Long);

        /** RoomDataPk tsQuoteTo. */
        public tsQuoteTo: (number|Long);

        /** RoomDataPk tsQuoteStart. */
        public tsQuoteStart: (number|Long);

        /** RoomDataPk players. */
        public players: pb.IRoomPkPlayer[];

        /** RoomDataPk tsGameFrom. */
        public tsGameFrom: (number|Long);

        /** RoomDataPk tsGameCur. */
        public tsGameCur: (number|Long);

        /** RoomDataPk quotes. */
        public quotes?: (pb.IQuotes|null);

        /** RoomDataPk quotesFuture. */
        public quotesFuture?: (pb.IQuotesFuture|null);

        /**
         * Creates a new RoomDataPk instance using the specified properties.
         * @param [properties] Properties to set
         * @returns RoomDataPk instance
         */
        public static create(properties?: pb.IRoomDataPk): pb.RoomDataPk;

        /**
         * Encodes the specified RoomDataPk message. Does not implicitly {@link pb.RoomDataPk.verify|verify} messages.
         * @param message RoomDataPk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IRoomDataPk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified RoomDataPk message, length delimited. Does not implicitly {@link pb.RoomDataPk.verify|verify} messages.
         * @param message RoomDataPk message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IRoomDataPk, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a RoomDataPk message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns RoomDataPk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.RoomDataPk;

        /**
         * Decodes a RoomDataPk message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns RoomDataPk
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.RoomDataPk;

        /**
         * Verifies a RoomDataPk message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a RoomDataPk message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns RoomDataPk
         */
        public static fromObject(object: { [k: string]: any }): pb.RoomDataPk;

        /**
         * Creates a plain object from a RoomDataPk message. Also converts values to other types if specified.
         * @param message RoomDataPk
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.RoomDataPk, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this RoomDataPk to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of an Email. */
    interface IEmail {

        /** Email sender */
        sender?: (number|null);

        /** Email receiver */
        receiver?: (number|null);

        /** Email type */
        type?: (pb.MessageType|null);

        /** Email text */
        text?: (string|null);

        /** Email ts */
        ts?: (number|Long|null);
    }

    /** Represents an Email. */
    class Email implements IEmail {

        /**
         * Constructs a new Email.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IEmail);

        /** Email sender. */
        public sender: number;

        /** Email receiver. */
        public receiver: number;

        /** Email type. */
        public type: pb.MessageType;

        /** Email text. */
        public text: string;

        /** Email ts. */
        public ts: (number|Long);

        /**
         * Creates a new Email instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Email instance
         */
        public static create(properties?: pb.IEmail): pb.Email;

        /**
         * Encodes the specified Email message. Does not implicitly {@link pb.Email.verify|verify} messages.
         * @param message Email message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Email message, length delimited. Does not implicitly {@link pb.Email.verify|verify} messages.
         * @param message Email message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IEmail, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes an Email message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Email
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.Email;

        /**
         * Decodes an Email message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Email
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.Email;

        /**
         * Verifies an Email message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates an Email message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Email
         */
        public static fromObject(object: { [k: string]: any }): pb.Email;

        /**
         * Creates a plain object from an Email message. Also converts values to other types if specified.
         * @param message Email
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.Email, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Email to JSON.
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

        /** RankingItem cgsClearance */
        cgsClearance?: (number|null);

        /** RankingItem cgsNetwin */
        cgsNetwin?: (number|null);

        /** RankingItem cgsProgress */
        cgsProgress?: (number|null);
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

        /** RankingItem cgsClearance. */
        public cgsClearance: number;

        /** RankingItem cgsNetwin. */
        public cgsNetwin: number;

        /** RankingItem cgsProgress. */
        public cgsProgress: number;

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
        Day7 = 11
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

    /** LoginType enum. */
    enum LoginType {
        LoginType_NULL = 0,
        MobilePhoneId = 1,
        WeChat = 2,
        QQ = 3,
        AppTest = 98,
        WebTest = 99
    }

    /** Properties of a CmdRegistry. */
    interface ICmdRegistry {

        /** CmdRegistry account */
        account?: (string|null);

        /** CmdRegistry type */
        type?: (pb.LoginType|null);

        /** CmdRegistry pwd */
        pwd?: (string|null);

        /** CmdRegistry sms */
        sms?: (string|null);

        /** CmdRegistry from */
        from?: (pb.AppFrom|null);
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

        /** CmdRegistry sms. */
        public sms: string;

        /** CmdRegistry from. */
        public from: pb.AppFrom;

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
}
