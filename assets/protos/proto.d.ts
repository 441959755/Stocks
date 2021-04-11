import * as $protobuf from "protobufjs";
/** Namespace pb. */
export namespace pb {

    /** Constant enum. */
    enum Constant {
        Constant_NULL = 0,
        MsgHead_Len = 10,
        MsgMaxBody_Len = 1024000
    }

    /** GameType enum. */
    enum GameType {
        GameType_NULL = 0,
        ShuangMang = 1,
        DingXiang = 2,
        ZhiBiao = 3,
        TiaoJianDan = 4,
        QiHuo = 5,
        JJ_PK = 6,
        JJ_DuoKong = 7,
        JJ_ChuangGuan = 8,
        JJ_QiHuo = 9,
        MoNiChaoGu = 10,
        ChaoGuDaSai = 11,
        GeGuJingChai = 12,
        DaPanJingChai = 13
    }

    /** MessageId enum. */
    enum MessageId {
        MessageId_NULL = 0,
        Cmd_Save_Stock2Db = 101,
        Cmd_Make_StockList = 103,
        Sync_S2C_QuoteItem = 1000,
        Sync_S2C_GameProperty = 1001,
        Req_QuoteSubscribe = 2001,
        Rep_QuoteSubscribe = 2002,
        Req_QuoteQuery = 2003,
        Rep_QuoteQuery = 2004,
        Req_QuoteEdit = 2005,
        Req_StockEdit = 2007,
        Req_Game_UploadIcon = 3001,
        Rep_Game_UploadIcon = 3002,
        Req_Game_EditNick = 3003,
        Rep_Game_EditNick = 3004,
        Req_Game_EditIcon = 3005,
        Rep_Game_EditIcon = 3006,
        Req_Game_Login = 4001,
        Rep_Game_Login = 4002
    }

    /** ErrorCode enum. */
    enum ErrorCode {
        CS_OK = 0,
        CS_UNKNOW = 1,
        CS_SERVER_ERROR = 2,
        CS_INVALID_PARAMETER = 3,
        CS_INVALID_ACCOUNT = 4,
        CS_INVALID_PASSWORD = 5
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

    /** Properties of a MessageSpan. */
    interface IMessageSpan {

        /** MessageSpan send */
        send?: (number|Long|null);

        /** MessageSpan recv */
        recv?: (number|Long|null);
    }

    /** Represents a MessageSpan. */
    class MessageSpan implements IMessageSpan {

        /**
         * Constructs a new MessageSpan.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IMessageSpan);

        /** MessageSpan send. */
        public send: (number|Long);

        /** MessageSpan recv. */
        public recv: (number|Long);

        /**
         * Creates a new MessageSpan instance using the specified properties.
         * @param [properties] Properties to set
         * @returns MessageSpan instance
         */
        public static create(properties?: pb.IMessageSpan): pb.MessageSpan;

        /**
         * Encodes the specified MessageSpan message. Does not implicitly {@link pb.MessageSpan.verify|verify} messages.
         * @param message MessageSpan message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IMessageSpan, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified MessageSpan message, length delimited. Does not implicitly {@link pb.MessageSpan.verify|verify} messages.
         * @param message MessageSpan message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IMessageSpan, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a MessageSpan message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns MessageSpan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.MessageSpan;

        /**
         * Decodes a MessageSpan message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns MessageSpan
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.MessageSpan;

        /**
         * Verifies a MessageSpan message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a MessageSpan message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns MessageSpan
         */
        public static fromObject(object: { [k: string]: any }): pb.MessageSpan;

        /**
         * Creates a plain object from a MessageSpan message. Also converts values to other types if specified.
         * @param message MessageSpan
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.MessageSpan, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this MessageSpan to JSON.
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

    /** GamePropertyId enum. */
    enum GamePropertyId {
        Gold = 0,
        Exp = 1,
        Level = 2,
        ShuangMang_Gold = 3,
        Max = 30
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

        /** GamePropertyItem value */
        value?: (number|Long|null);
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

        /** GamePropertyItem value. */
        public value: (number|Long);

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

    /** Properties of a GameProperty. */
    interface IGameProperty {

        /** GameProperty id */
        id?: (pb.GamePropertyId|null);

        /** GameProperty oldValue */
        oldValue?: (number|null);

        /** GameProperty curValue */
        curValue?: (number|null);
    }

    /** Represents a GameProperty. */
    class GameProperty implements IGameProperty {

        /**
         * Constructs a new GameProperty.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.IGameProperty);

        /** GameProperty id. */
        public id: pb.GamePropertyId;

        /** GameProperty oldValue. */
        public oldValue: number;

        /** GameProperty curValue. */
        public curValue: number;

        /**
         * Creates a new GameProperty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns GameProperty instance
         */
        public static create(properties?: pb.IGameProperty): pb.GameProperty;

        /**
         * Encodes the specified GameProperty message. Does not implicitly {@link pb.GameProperty.verify|verify} messages.
         * @param message GameProperty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.IGameProperty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified GameProperty message, length delimited. Does not implicitly {@link pb.GameProperty.verify|verify} messages.
         * @param message GameProperty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.IGameProperty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a GameProperty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns GameProperty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.GameProperty;

        /**
         * Decodes a GameProperty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns GameProperty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.GameProperty;

        /**
         * Verifies a GameProperty message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a GameProperty message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns GameProperty
         */
        public static fromObject(object: { [k: string]: any }): pb.GameProperty;

        /**
         * Creates a plain object from a GameProperty message. Also converts values to other types if specified.
         * @param message GameProperty
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.GameProperty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this GameProperty to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** Properties of a SyncGameProperty. */
    interface ISyncGameProperty {

        /** SyncGameProperty properties */
        properties?: (pb.IGameProperty[]|null);
    }

    /** Represents a SyncGameProperty. */
    class SyncGameProperty implements ISyncGameProperty {

        /**
         * Constructs a new SyncGameProperty.
         * @param [properties] Properties to set
         */
        constructor(properties?: pb.ISyncGameProperty);

        /** SyncGameProperty properties. */
        public properties: pb.IGameProperty[];

        /**
         * Creates a new SyncGameProperty instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SyncGameProperty instance
         */
        public static create(properties?: pb.ISyncGameProperty): pb.SyncGameProperty;

        /**
         * Encodes the specified SyncGameProperty message. Does not implicitly {@link pb.SyncGameProperty.verify|verify} messages.
         * @param message SyncGameProperty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: pb.ISyncGameProperty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SyncGameProperty message, length delimited. Does not implicitly {@link pb.SyncGameProperty.verify|verify} messages.
         * @param message SyncGameProperty message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: pb.ISyncGameProperty, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SyncGameProperty message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SyncGameProperty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): pb.SyncGameProperty;

        /**
         * Decodes a SyncGameProperty message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SyncGameProperty
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): pb.SyncGameProperty;

        /**
         * Verifies a SyncGameProperty message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SyncGameProperty message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SyncGameProperty
         */
        public static fromObject(object: { [k: string]: any }): pb.SyncGameProperty;

        /**
         * Creates a plain object from a SyncGameProperty message. Also converts values to other types if specified.
         * @param message SyncGameProperty
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: pb.SyncGameProperty, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SyncGameProperty to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };
    }

    /** LoginType enum. */
    enum LoginType {
        LoginType_NULL = 0,
        MobilePhoneId = 1,
        WeChat = 2,
        QQ = 3
    }

    /** LoginFrom enum. */
    enum LoginFrom {
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

    /** Properties of a CmdRegistry. */
    interface ICmdRegistry {

        /** CmdRegistry account */
        account?: (string|null);

        /** CmdRegistry type */
        type?: (pb.LoginType|null);

        /** CmdRegistry from */
        from?: (pb.LoginFrom|null);

        /** CmdRegistry pwd */
        pwd?: (string|null);

        /** CmdRegistry sms */
        sms?: (string|null);
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

        /** CmdRegistry from. */
        public from: pb.LoginFrom;

        /** CmdRegistry pwd. */
        public pwd: string;

        /** CmdRegistry sms. */
        public sms: string;

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

        /** CmdLogin from */
        from?: (pb.LoginFrom|null);

        /** CmdLogin pwd */
        pwd?: (string|null);
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

        /** CmdLogin from. */
        public from: pb.LoginFrom;

        /** CmdLogin pwd. */
        public pwd: string;

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

    /** KType enum. */
    enum KType {
        KType_NULL = 0,
        Real = 1,
        Min = 2,
        Min15 = 3,
        Min30 = 4,
        Min60 = 5,
        Day = 10,
        Day7 = 11,
        Mon = 20,
        Mon3 = 21,
        Year = 30
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
}
