/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = protobuf;

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.pb = (function () {

    /**
     * Namespace pb.
     * @exports pb
     * @namespace
     */
    var pb = {};

    /**
     * Constant enum.
     * @name pb.Constant
     * @enum {number}
     * @property {number} Constant_NULL=0 Constant_NULL value
     * @property {number} MsgHead_Len=10 MsgHead_Len value
     * @property {number} MsgMaxBody_Len=1024000 MsgMaxBody_Len value
     */
    pb.Constant = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Constant_NULL"] = 0;
        values[valuesById[10] = "MsgHead_Len"] = 10;
        values[valuesById[1024000] = "MsgMaxBody_Len"] = 1024000;
        return values;
    })();

    /**
     * AppPlantForm enum.
     * @name pb.AppPlantForm
     * @enum {number}
     * @property {number} AppPlantForm_NULL=0 AppPlantForm_NULL value
     * @property {number} WechatMinProgram=1 WechatMinProgram value
     * @property {number} Ios=11 Ios value
     * @property {number} Android=21 Android value
     */
    pb.AppPlantForm = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AppPlantForm_NULL"] = 0;
        values[valuesById[1] = "WechatMinProgram"] = 1;
        values[valuesById[11] = "Ios"] = 11;
        values[valuesById[21] = "Android"] = 21;
        return values;
    })();

    /**
     * AdPosition enum.
     * @name pb.AdPosition
     * @enum {number}
     * @property {number} AdPosition_NULL=0 AdPosition_NULL value
     * @property {number} StartUp=1 StartUp value
     * @property {number} Main=11 Main value
     */
    pb.AdPosition = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "AdPosition_NULL"] = 0;
        values[valuesById[1] = "StartUp"] = 1;
        values[valuesById[11] = "Main"] = 11;
        return values;
    })();

    /**
     * AppFrom enum.
     * @name pb.AppFrom
     * @enum {number}
     * @property {number} Android_000=0 Android_000 value
     * @property {number} Android_001=1 Android_001 value
     * @property {number} Android_201=201 Android_201 value
     * @property {number} Android_204=204 Android_204 value
     * @property {number} Android_205=205 Android_205 value
     * @property {number} Android_206=206 Android_206 value
     * @property {number} Android_208=208 Android_208 value
     * @property {number} Android_209=209 Android_209 value
     * @property {number} Android_210=210 Android_210 value
     * @property {number} Android_211=211 Android_211 value
     * @property {number} Android_212=212 Android_212 value
     * @property {number} Android_301=301 Android_301 value
     * @property {number} Android_302=302 Android_302 value
     * @property {number} Android_601=601 Android_601 value
     * @property {number} Android_1000=1000 Android_1000 value
     * @property {number} Android_1204=1204 Android_1204 value
     * @property {number} Android_1205=1205 Android_1205 value
     * @property {number} Android_1208=1208 Android_1208 value
     * @property {number} Android_1212=1212 Android_1212 value
     * @property {number} IosAppleStore=6666 IosAppleStore value
     * @property {number} Ipad=6667 Ipad value
     * @property {number} WebsiteIos=7777 WebsiteIos value
     * @property {number} WebsiteAndriod=7778 WebsiteAndriod value
     * @property {number} WeChatMinProgram=8888 WeChatMinProgram value
     */
    pb.AppFrom = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Android_000"] = 0;
        values[valuesById[1] = "Android_001"] = 1;
        values[valuesById[201] = "Android_201"] = 201;
        values[valuesById[204] = "Android_204"] = 204;
        values[valuesById[205] = "Android_205"] = 205;
        values[valuesById[206] = "Android_206"] = 206;
        values[valuesById[208] = "Android_208"] = 208;
        values[valuesById[209] = "Android_209"] = 209;
        values[valuesById[210] = "Android_210"] = 210;
        values[valuesById[211] = "Android_211"] = 211;
        values[valuesById[212] = "Android_212"] = 212;
        values[valuesById[301] = "Android_301"] = 301;
        values[valuesById[302] = "Android_302"] = 302;
        values[valuesById[601] = "Android_601"] = 601;
        values[valuesById[1000] = "Android_1000"] = 1000;
        values[valuesById[1204] = "Android_1204"] = 1204;
        values[valuesById[1205] = "Android_1205"] = 1205;
        values[valuesById[1208] = "Android_1208"] = 1208;
        values[valuesById[1212] = "Android_1212"] = 1212;
        values[valuesById[6666] = "IosAppleStore"] = 6666;
        values[valuesById[6667] = "Ipad"] = 6667;
        values[valuesById[7777] = "WebsiteIos"] = 7777;
        values[valuesById[7778] = "WebsiteAndriod"] = 7778;
        values[valuesById[8888] = "WeChatMinProgram"] = 8888;
        return values;
    })();

    /**
     * MessageId enum.
     * @name pb.MessageId
     * @enum {number}
     * @property {number} MessageId_NULL=0 MessageId_NULL value
     * @property {number} Cmd_Save_Stock2Db=101 Cmd_Save_Stock2Db value
     * @property {number} Cmd_Make_StockList=103 Cmd_Make_StockList value
     * @property {number} Sync_S2C_QuoteItem=1000 Sync_S2C_QuoteItem value
     * @property {number} Sync_S2C_GameProperty=1002 Sync_S2C_GameProperty value
     * @property {number} Sync_S2C_GameCounter=1004 Sync_S2C_GameCounter value
     * @property {number} Sync_C2S_GameHeart=1006 Sync_C2S_GameHeart value
     * @property {number} Req_QuoteSubscribe=2001 Req_QuoteSubscribe value
     * @property {number} Rep_QuoteSubscribe=2002 Rep_QuoteSubscribe value
     * @property {number} Req_QuoteQuery=2003 Req_QuoteQuery value
     * @property {number} Rep_QuoteQuery=2004 Rep_QuoteQuery value
     * @property {number} Req_QuoteEdit=2005 Req_QuoteEdit value
     * @property {number} Req_StockEdit=2007 Req_StockEdit value
     * @property {number} Req_QuoteQueryFuture=2009 Req_QuoteQueryFuture value
     * @property {number} Rep_QuoteQueryFuture=2010 Rep_QuoteQueryFuture value
     * @property {number} Req_Game_UploadIcon=3001 Req_Game_UploadIcon value
     * @property {number} Rep_Game_UploadIcon=3002 Rep_Game_UploadIcon value
     * @property {number} Req_Game_EditNick=3003 Req_Game_EditNick value
     * @property {number} Rep_Game_EditNick=3004 Rep_Game_EditNick value
     * @property {number} Req_Game_EditIcon=3005 Req_Game_EditIcon value
     * @property {number} Rep_Game_EditIcon=3006 Rep_Game_EditIcon value
     * @property {number} Req_Game_Login=4001 Req_Game_Login value
     * @property {number} Rep_Game_Login=4002 Rep_Game_Login value
     * @property {number} Req_Game_Start=4003 Req_Game_Start value
     * @property {number} Rep_Game_Start=4004 Rep_Game_Start value
     * @property {number} Req_Game_Over=4005 Req_Game_Over value
     * @property {number} Rep_Game_Over=4006 Rep_Game_Over value
     * @property {number} Req_Game_QueryGameResult=4007 Req_Game_QueryGameResult value
     * @property {number} Rep_Game_QueryGameResult=4008 Rep_Game_QueryGameResult value
     * @property {number} Req_Game_SmxlReport=4009 Req_Game_SmxlReport value
     * @property {number} Rep_Game_SmxlReport=4010 Rep_Game_SmxlReport value
     * @property {number} Req_Game_SmxlReset=4011 Req_Game_SmxlReset value
     * @property {number} Rep_Game_SmxlReset=4012 Rep_Game_SmxlReset value
     * @property {number} Req_Game_GetGameOperation=4013 Req_Game_GetGameOperation value
     * @property {number} Rep_Game_GetGameOperation=4014 Rep_Game_GetGameOperation value
     */
    pb.MessageId = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "MessageId_NULL"] = 0;
        values[valuesById[101] = "Cmd_Save_Stock2Db"] = 101;
        values[valuesById[103] = "Cmd_Make_StockList"] = 103;
        values[valuesById[1000] = "Sync_S2C_QuoteItem"] = 1000;
        values[valuesById[1002] = "Sync_S2C_GameProperty"] = 1002;
        values[valuesById[1004] = "Sync_S2C_GameCounter"] = 1004;
        values[valuesById[1006] = "Sync_C2S_GameHeart"] = 1006;
        values[valuesById[2001] = "Req_QuoteSubscribe"] = 2001;
        values[valuesById[2002] = "Rep_QuoteSubscribe"] = 2002;
        values[valuesById[2003] = "Req_QuoteQuery"] = 2003;
        values[valuesById[2004] = "Rep_QuoteQuery"] = 2004;
        values[valuesById[2005] = "Req_QuoteEdit"] = 2005;
        values[valuesById[2007] = "Req_StockEdit"] = 2007;
        values[valuesById[2009] = "Req_QuoteQueryFuture"] = 2009;
        values[valuesById[2010] = "Rep_QuoteQueryFuture"] = 2010;
        values[valuesById[3001] = "Req_Game_UploadIcon"] = 3001;
        values[valuesById[3002] = "Rep_Game_UploadIcon"] = 3002;
        values[valuesById[3003] = "Req_Game_EditNick"] = 3003;
        values[valuesById[3004] = "Rep_Game_EditNick"] = 3004;
        values[valuesById[3005] = "Req_Game_EditIcon"] = 3005;
        values[valuesById[3006] = "Rep_Game_EditIcon"] = 3006;
        values[valuesById[4001] = "Req_Game_Login"] = 4001;
        values[valuesById[4002] = "Rep_Game_Login"] = 4002;
        values[valuesById[4003] = "Req_Game_Start"] = 4003;
        values[valuesById[4004] = "Rep_Game_Start"] = 4004;
        values[valuesById[4005] = "Req_Game_Over"] = 4005;
        values[valuesById[4006] = "Rep_Game_Over"] = 4006;
        values[valuesById[4007] = "Req_Game_QueryGameResult"] = 4007;
        values[valuesById[4008] = "Rep_Game_QueryGameResult"] = 4008;
        values[valuesById[4009] = "Req_Game_SmxlReport"] = 4009;
        values[valuesById[4010] = "Rep_Game_SmxlReport"] = 4010;
        values[valuesById[4011] = "Req_Game_SmxlReset"] = 4011;
        values[valuesById[4012] = "Rep_Game_SmxlReset"] = 4012;
        values[valuesById[4013] = "Req_Game_GetGameOperation"] = 4013;
        values[valuesById[4014] = "Rep_Game_GetGameOperation"] = 4014;
        return values;
    })();

    /**
     * ErrorCode enum.
     * @name pb.ErrorCode
     * @enum {number}
     * @property {number} CS_OK=0 CS_OK value
     * @property {number} CS_UNKNOW=1 CS_UNKNOW value
     * @property {number} CS_SERVER_ERROR=2 CS_SERVER_ERROR value
     * @property {number} CS_INVALID_PARAMETER=3 CS_INVALID_PARAMETER value
     * @property {number} CS_INVALID_ACCOUNT=4 CS_INVALID_ACCOUNT value
     * @property {number} CS_INVALID_PASSWORD=5 CS_INVALID_PASSWORD value
     */
    pb.ErrorCode = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "CS_OK"] = 0;
        values[valuesById[1] = "CS_UNKNOW"] = 1;
        values[valuesById[2] = "CS_SERVER_ERROR"] = 2;
        values[valuesById[3] = "CS_INVALID_PARAMETER"] = 3;
        values[valuesById[4] = "CS_INVALID_ACCOUNT"] = 4;
        values[valuesById[5] = "CS_INVALID_PASSWORD"] = 5;
        return values;
    })();

    pb.MessageHead = (function () {

        /**
         * Properties of a MessageHead.
         * @memberof pb
         * @interface IMessageHead
         * @property {number|null} [messageId] MessageHead messageId
         * @property {number|null} [messageLen] MessageHead messageLen
         */

        /**
         * Constructs a new MessageHead.
         * @memberof pb
         * @classdesc Represents a MessageHead.
         * @implements IMessageHead
         * @constructor
         * @param {pb.IMessageHead=} [properties] Properties to set
         */
        function MessageHead(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * MessageHead messageId.
         * @member {number} messageId
         * @memberof pb.MessageHead
         * @instance
         */
        MessageHead.prototype.messageId = 0;

        /**
         * MessageHead messageLen.
         * @member {number} messageLen
         * @memberof pb.MessageHead
         * @instance
         */
        MessageHead.prototype.messageLen = 0;

        /**
         * Creates a new MessageHead instance using the specified properties.
         * @function create
         * @memberof pb.MessageHead
         * @static
         * @param {pb.IMessageHead=} [properties] Properties to set
         * @returns {pb.MessageHead} MessageHead instance
         */
        MessageHead.create = function create(properties) {
            return new MessageHead(properties);
        };

        /**
         * Encodes the specified MessageHead message. Does not implicitly {@link pb.MessageHead.verify|verify} messages.
         * @function encode
         * @memberof pb.MessageHead
         * @static
         * @param {pb.IMessageHead} message MessageHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageHead.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.messageId != null && Object.hasOwnProperty.call(message, "messageId"))
                writer.uint32(/* id 1, wireType 5 =*/13).sfixed32(message.messageId);
            if (message.messageLen != null && Object.hasOwnProperty.call(message, "messageLen"))
                writer.uint32(/* id 2, wireType 5 =*/21).sfixed32(message.messageLen);
            return writer;
        };

        /**
         * Encodes the specified MessageHead message, length delimited. Does not implicitly {@link pb.MessageHead.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.MessageHead
         * @static
         * @param {pb.IMessageHead} message MessageHead message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        MessageHead.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a MessageHead message from the specified reader or buffer.
         * @function decode
         * @memberof pb.MessageHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.MessageHead} MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageHead.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.MessageHead();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.messageId = reader.sfixed32();
                        break;
                    case 2:
                        message.messageLen = reader.sfixed32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a MessageHead message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.MessageHead
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.MessageHead} MessageHead
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        MessageHead.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a MessageHead message.
         * @function verify
         * @memberof pb.MessageHead
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        MessageHead.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                if (!$util.isInteger(message.messageId))
                    return "messageId: integer expected";
            if (message.messageLen != null && message.hasOwnProperty("messageLen"))
                if (!$util.isInteger(message.messageLen))
                    return "messageLen: integer expected";
            return null;
        };

        /**
         * Creates a MessageHead message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.MessageHead
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.MessageHead} MessageHead
         */
        MessageHead.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.MessageHead)
                return object;
            var message = new $root.pb.MessageHead();
            if (object.messageId != null)
                message.messageId = object.messageId | 0;
            if (object.messageLen != null)
                message.messageLen = object.messageLen | 0;
            return message;
        };

        /**
         * Creates a plain object from a MessageHead message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.MessageHead
         * @static
         * @param {pb.MessageHead} message MessageHead
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        MessageHead.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.messageId = 0;
                object.messageLen = 0;
            }
            if (message.messageId != null && message.hasOwnProperty("messageId"))
                object.messageId = message.messageId;
            if (message.messageLen != null && message.hasOwnProperty("messageLen"))
                object.messageLen = message.messageLen;
            return object;
        };

        /**
         * Converts this MessageHead to JSON.
         * @function toJSON
         * @memberof pb.MessageHead
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        MessageHead.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return MessageHead;
    })();

    pb.ErrorInfo = (function () {

        /**
         * Properties of an ErrorInfo.
         * @memberof pb
         * @interface IErrorInfo
         * @property {number|null} [code] ErrorInfo code
         * @property {string|null} [err] ErrorInfo err
         */

        /**
         * Constructs a new ErrorInfo.
         * @memberof pb
         * @classdesc Represents an ErrorInfo.
         * @implements IErrorInfo
         * @constructor
         * @param {pb.IErrorInfo=} [properties] Properties to set
         */
        function ErrorInfo(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ErrorInfo code.
         * @member {number} code
         * @memberof pb.ErrorInfo
         * @instance
         */
        ErrorInfo.prototype.code = 0;

        /**
         * ErrorInfo err.
         * @member {string} err
         * @memberof pb.ErrorInfo
         * @instance
         */
        ErrorInfo.prototype.err = "";

        /**
         * Creates a new ErrorInfo instance using the specified properties.
         * @function create
         * @memberof pb.ErrorInfo
         * @static
         * @param {pb.IErrorInfo=} [properties] Properties to set
         * @returns {pb.ErrorInfo} ErrorInfo instance
         */
        ErrorInfo.create = function create(properties) {
            return new ErrorInfo(properties);
        };

        /**
         * Encodes the specified ErrorInfo message. Does not implicitly {@link pb.ErrorInfo.verify|verify} messages.
         * @function encode
         * @memberof pb.ErrorInfo
         * @static
         * @param {pb.IErrorInfo} message ErrorInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorInfo.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.err);
            return writer;
        };

        /**
         * Encodes the specified ErrorInfo message, length delimited. Does not implicitly {@link pb.ErrorInfo.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.ErrorInfo
         * @static
         * @param {pb.IErrorInfo} message ErrorInfo message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ErrorInfo.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an ErrorInfo message from the specified reader or buffer.
         * @function decode
         * @memberof pb.ErrorInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.ErrorInfo} ErrorInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorInfo.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.ErrorInfo();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.code = reader.int32();
                        break;
                    case 2:
                        message.err = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an ErrorInfo message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.ErrorInfo
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.ErrorInfo} ErrorInfo
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ErrorInfo.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an ErrorInfo message.
         * @function verify
         * @memberof pb.ErrorInfo
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ErrorInfo.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.err != null && message.hasOwnProperty("err"))
                if (!$util.isString(message.err))
                    return "err: string expected";
            return null;
        };

        /**
         * Creates an ErrorInfo message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.ErrorInfo
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.ErrorInfo} ErrorInfo
         */
        ErrorInfo.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.ErrorInfo)
                return object;
            var message = new $root.pb.ErrorInfo();
            if (object.code != null)
                message.code = object.code | 0;
            if (object.err != null)
                message.err = String(object.err);
            return message;
        };

        /**
         * Creates a plain object from an ErrorInfo message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.ErrorInfo
         * @static
         * @param {pb.ErrorInfo} message ErrorInfo
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ErrorInfo.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.err = "";
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = message.err;
            return object;
        };

        /**
         * Converts this ErrorInfo to JSON.
         * @function toJSON
         * @memberof pb.ErrorInfo
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ErrorInfo.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return ErrorInfo;
    })();

    pb.AdClicked = (function () {

        /**
         * Properties of an AdClicked.
         * @memberof pb
         * @interface IAdClicked
         * @property {number|null} [uid] AdClicked uid
         * @property {number|null} [pos] AdClicked pos
         * @property {string|null} [url] AdClicked url
         * @property {pb.AppFrom|null} [from] AdClicked from
         */

        /**
         * Constructs a new AdClicked.
         * @memberof pb
         * @classdesc Represents an AdClicked.
         * @implements IAdClicked
         * @constructor
         * @param {pb.IAdClicked=} [properties] Properties to set
         */
        function AdClicked(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * AdClicked uid.
         * @member {number} uid
         * @memberof pb.AdClicked
         * @instance
         */
        AdClicked.prototype.uid = 0;

        /**
         * AdClicked pos.
         * @member {number} pos
         * @memberof pb.AdClicked
         * @instance
         */
        AdClicked.prototype.pos = 0;

        /**
         * AdClicked url.
         * @member {string} url
         * @memberof pb.AdClicked
         * @instance
         */
        AdClicked.prototype.url = "";

        /**
         * AdClicked from.
         * @member {pb.AppFrom} from
         * @memberof pb.AdClicked
         * @instance
         */
        AdClicked.prototype.from = 0;

        /**
         * Creates a new AdClicked instance using the specified properties.
         * @function create
         * @memberof pb.AdClicked
         * @static
         * @param {pb.IAdClicked=} [properties] Properties to set
         * @returns {pb.AdClicked} AdClicked instance
         */
        AdClicked.create = function create(properties) {
            return new AdClicked(properties);
        };

        /**
         * Encodes the specified AdClicked message. Does not implicitly {@link pb.AdClicked.verify|verify} messages.
         * @function encode
         * @memberof pb.AdClicked
         * @static
         * @param {pb.IAdClicked} message AdClicked message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdClicked.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.pos != null && Object.hasOwnProperty.call(message, "pos"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.pos);
            if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.url);
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.from);
            return writer;
        };

        /**
         * Encodes the specified AdClicked message, length delimited. Does not implicitly {@link pb.AdClicked.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.AdClicked
         * @static
         * @param {pb.IAdClicked} message AdClicked message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        AdClicked.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes an AdClicked message from the specified reader or buffer.
         * @function decode
         * @memberof pb.AdClicked
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.AdClicked} AdClicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdClicked.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.AdClicked();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.pos = reader.int32();
                        break;
                    case 3:
                        message.url = reader.string();
                        break;
                    case 4:
                        message.from = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes an AdClicked message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.AdClicked
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.AdClicked} AdClicked
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        AdClicked.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies an AdClicked message.
         * @function verify
         * @memberof pb.AdClicked
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        AdClicked.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.pos != null && message.hasOwnProperty("pos"))
                if (!$util.isInteger(message.pos))
                    return "pos: integer expected";
            if (message.url != null && message.hasOwnProperty("url"))
                if (!$util.isString(message.url))
                    return "url: string expected";
            if (message.from != null && message.hasOwnProperty("from"))
                switch (message.from) {
                    default:
                        return "from: enum value expected";
                    case 0:
                    case 1:
                    case 201:
                    case 204:
                    case 205:
                    case 206:
                    case 208:
                    case 209:
                    case 210:
                    case 211:
                    case 212:
                    case 301:
                    case 302:
                    case 601:
                    case 1000:
                    case 1204:
                    case 1205:
                    case 1208:
                    case 1212:
                    case 6666:
                    case 6667:
                    case 7777:
                    case 7778:
                    case 8888:
                        break;
                }
            return null;
        };

        /**
         * Creates an AdClicked message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.AdClicked
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.AdClicked} AdClicked
         */
        AdClicked.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.AdClicked)
                return object;
            var message = new $root.pb.AdClicked();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.pos != null)
                message.pos = object.pos | 0;
            if (object.url != null)
                message.url = String(object.url);
            switch (object.from) {
                case "Android_000":
                case 0:
                    message.from = 0;
                    break;
                case "Android_001":
                case 1:
                    message.from = 1;
                    break;
                case "Android_201":
                case 201:
                    message.from = 201;
                    break;
                case "Android_204":
                case 204:
                    message.from = 204;
                    break;
                case "Android_205":
                case 205:
                    message.from = 205;
                    break;
                case "Android_206":
                case 206:
                    message.from = 206;
                    break;
                case "Android_208":
                case 208:
                    message.from = 208;
                    break;
                case "Android_209":
                case 209:
                    message.from = 209;
                    break;
                case "Android_210":
                case 210:
                    message.from = 210;
                    break;
                case "Android_211":
                case 211:
                    message.from = 211;
                    break;
                case "Android_212":
                case 212:
                    message.from = 212;
                    break;
                case "Android_301":
                case 301:
                    message.from = 301;
                    break;
                case "Android_302":
                case 302:
                    message.from = 302;
                    break;
                case "Android_601":
                case 601:
                    message.from = 601;
                    break;
                case "Android_1000":
                case 1000:
                    message.from = 1000;
                    break;
                case "Android_1204":
                case 1204:
                    message.from = 1204;
                    break;
                case "Android_1205":
                case 1205:
                    message.from = 1205;
                    break;
                case "Android_1208":
                case 1208:
                    message.from = 1208;
                    break;
                case "Android_1212":
                case 1212:
                    message.from = 1212;
                    break;
                case "IosAppleStore":
                case 6666:
                    message.from = 6666;
                    break;
                case "Ipad":
                case 6667:
                    message.from = 6667;
                    break;
                case "WebsiteIos":
                case 7777:
                    message.from = 7777;
                    break;
                case "WebsiteAndriod":
                case 7778:
                    message.from = 7778;
                    break;
                case "WeChatMinProgram":
                case 8888:
                    message.from = 8888;
                    break;
            }
            return message;
        };

        /**
         * Creates a plain object from an AdClicked message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.AdClicked
         * @static
         * @param {pb.AdClicked} message AdClicked
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        AdClicked.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.pos = 0;
                object.url = "";
                object.from = options.enums === String ? "Android_000" : 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.pos != null && message.hasOwnProperty("pos"))
                object.pos = message.pos;
            if (message.url != null && message.hasOwnProperty("url"))
                object.url = message.url;
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = options.enums === String ? $root.pb.AppFrom[message.from] : message.from;
            return object;
        };

        /**
         * Converts this AdClicked to JSON.
         * @function toJSON
         * @memberof pb.AdClicked
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        AdClicked.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return AdClicked;
    })();

    pb.VoidRequest = (function () {

        /**
         * Properties of a VoidRequest.
         * @memberof pb
         * @interface IVoidRequest
         */

        /**
         * Constructs a new VoidRequest.
         * @memberof pb
         * @classdesc Represents a VoidRequest.
         * @implements IVoidRequest
         * @constructor
         * @param {pb.IVoidRequest=} [properties] Properties to set
         */
        function VoidRequest(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new VoidRequest instance using the specified properties.
         * @function create
         * @memberof pb.VoidRequest
         * @static
         * @param {pb.IVoidRequest=} [properties] Properties to set
         * @returns {pb.VoidRequest} VoidRequest instance
         */
        VoidRequest.create = function create(properties) {
            return new VoidRequest(properties);
        };

        /**
         * Encodes the specified VoidRequest message. Does not implicitly {@link pb.VoidRequest.verify|verify} messages.
         * @function encode
         * @memberof pb.VoidRequest
         * @static
         * @param {pb.IVoidRequest} message VoidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoidRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified VoidRequest message, length delimited. Does not implicitly {@link pb.VoidRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.VoidRequest
         * @static
         * @param {pb.IVoidRequest} message VoidRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoidRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VoidRequest message from the specified reader or buffer.
         * @function decode
         * @memberof pb.VoidRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.VoidRequest} VoidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoidRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.VoidRequest();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a VoidRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.VoidRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.VoidRequest} VoidRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoidRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VoidRequest message.
         * @function verify
         * @memberof pb.VoidRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VoidRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a VoidRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.VoidRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.VoidRequest} VoidRequest
         */
        VoidRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.VoidRequest)
                return object;
            return new $root.pb.VoidRequest();
        };

        /**
         * Creates a plain object from a VoidRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.VoidRequest
         * @static
         * @param {pb.VoidRequest} message VoidRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VoidRequest.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this VoidRequest to JSON.
         * @function toJSON
         * @memberof pb.VoidRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VoidRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VoidRequest;
    })();

    pb.VoidReply = (function () {

        /**
         * Properties of a VoidReply.
         * @memberof pb
         * @interface IVoidReply
         */

        /**
         * Constructs a new VoidReply.
         * @memberof pb
         * @classdesc Represents a VoidReply.
         * @implements IVoidReply
         * @constructor
         * @param {pb.IVoidReply=} [properties] Properties to set
         */
        function VoidReply(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Creates a new VoidReply instance using the specified properties.
         * @function create
         * @memberof pb.VoidReply
         * @static
         * @param {pb.IVoidReply=} [properties] Properties to set
         * @returns {pb.VoidReply} VoidReply instance
         */
        VoidReply.create = function create(properties) {
            return new VoidReply(properties);
        };

        /**
         * Encodes the specified VoidReply message. Does not implicitly {@link pb.VoidReply.verify|verify} messages.
         * @function encode
         * @memberof pb.VoidReply
         * @static
         * @param {pb.IVoidReply} message VoidReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoidReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            return writer;
        };

        /**
         * Encodes the specified VoidReply message, length delimited. Does not implicitly {@link pb.VoidReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.VoidReply
         * @static
         * @param {pb.IVoidReply} message VoidReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        VoidReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a VoidReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.VoidReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.VoidReply} VoidReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoidReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.VoidReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a VoidReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.VoidReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.VoidReply} VoidReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        VoidReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a VoidReply message.
         * @function verify
         * @memberof pb.VoidReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        VoidReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            return null;
        };

        /**
         * Creates a VoidReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.VoidReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.VoidReply} VoidReply
         */
        VoidReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.VoidReply)
                return object;
            return new $root.pb.VoidReply();
        };

        /**
         * Creates a plain object from a VoidReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.VoidReply
         * @static
         * @param {pb.VoidReply} message VoidReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        VoidReply.toObject = function toObject() {
            return {};
        };

        /**
         * Converts this VoidReply to JSON.
         * @function toJSON
         * @memberof pb.VoidReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        VoidReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return VoidReply;
    })();

    /**
     * GameType enum.
     * @name pb.GameType
     * @enum {number}
     * @property {number} GameType_NULL=0 GameType_NULL value
     * @property {number} ShuangMang=3 ShuangMang value
     * @property {number} DingXiang=4 DingXiang value
     * @property {number} ZhiBiao=17 ZhiBiao value
     * @property {number} TiaoJianDan=11 TiaoJianDan value
     * @property {number} QiHuo=6 QiHuo value
     * @property {number} JJ_PK=1 JJ_PK value
     * @property {number} JJ_DuoKong=2 JJ_DuoKong value
     * @property {number} JJ_ChuangGuan=16 JJ_ChuangGuan value
     * @property {number} JJ_QiHuo=15 JJ_QiHuo value
     * @property {number} MoNiChaoGu=10 MoNiChaoGu value
     * @property {number} ChaoGuDaSai=9 ChaoGuDaSai value
     * @property {number} GeGuJingChai=7 GeGuJingChai value
     * @property {number} DaPanJingChai=8 DaPanJingChai value
     * @property {number} MaxGameType=30 MaxGameType value
     */
    pb.GameType = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GameType_NULL"] = 0;
        values[valuesById[3] = "ShuangMang"] = 3;
        values[valuesById[4] = "DingXiang"] = 4;
        values[valuesById[17] = "ZhiBiao"] = 17;
        values[valuesById[11] = "TiaoJianDan"] = 11;
        values[valuesById[6] = "QiHuo"] = 6;
        values[valuesById[1] = "JJ_PK"] = 1;
        values[valuesById[2] = "JJ_DuoKong"] = 2;
        values[valuesById[16] = "JJ_ChuangGuan"] = 16;
        values[valuesById[15] = "JJ_QiHuo"] = 15;
        values[valuesById[10] = "MoNiChaoGu"] = 10;
        values[valuesById[9] = "ChaoGuDaSai"] = 9;
        values[valuesById[7] = "GeGuJingChai"] = 7;
        values[valuesById[8] = "DaPanJingChai"] = 8;
        values[valuesById[30] = "MaxGameType"] = 30;
        return values;
    })();

    /**
     * GamePropertyId enum.
     * @name pb.GamePropertyId
     * @enum {number}
     * @property {number} Gold=0 Gold value
     * @property {number} Exp=1 Exp value
     * @property {number} Level=2 Level value
     * @property {number} ShuangMang_Gold=3 ShuangMang_Gold value
     * @property {number} Diamond=4 Diamond value
     * @property {number} Max=30 Max value
     */
    pb.GamePropertyId = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Gold"] = 0;
        values[valuesById[1] = "Exp"] = 1;
        values[valuesById[2] = "Level"] = 2;
        values[valuesById[3] = "ShuangMang_Gold"] = 3;
        values[valuesById[4] = "Diamond"] = 4;
        values[valuesById[30] = "Max"] = 30;
        return values;
    })();

    /**
     * GameOperationId enum.
     * @name pb.GameOperationId
     * @enum {number}
     * @property {number} GameOperationId_NULL=0 GameOperationId_NULL value
     * @property {number} Ask=1 Ask value
     * @property {number} Bid=2 Bid value
     * @property {number} Wait=3 Wait value
     * @property {number} Hold=4 Hold value
     * @property {number} Ask_Force=5 Ask_Force value
     * @property {number} Long=8 Long value
     * @property {number} Short=9 Short value
     * @property {number} END=150 END value
     */
    pb.GameOperationId = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "GameOperationId_NULL"] = 0;
        values[valuesById[1] = "Ask"] = 1;
        values[valuesById[2] = "Bid"] = 2;
        values[valuesById[3] = "Wait"] = 3;
        values[valuesById[4] = "Hold"] = 4;
        values[valuesById[5] = "Ask_Force"] = 5;
        values[valuesById[8] = "Long"] = 8;
        values[valuesById[9] = "Short"] = 9;
        values[valuesById[150] = "END"] = 150;
        return values;
    })();

    pb.GameCounter = (function () {

        /**
         * Properties of a GameCounter.
         * @memberof pb
         * @interface IGameCounter
         * @property {pb.GameType|null} [game] GameCounter game
         * @property {number|null} [win] GameCounter win
         * @property {number|null} [lose] GameCounter lose
         */

        /**
         * Constructs a new GameCounter.
         * @memberof pb
         * @classdesc Represents a GameCounter.
         * @implements IGameCounter
         * @constructor
         * @param {pb.IGameCounter=} [properties] Properties to set
         */
        function GameCounter(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameCounter game.
         * @member {pb.GameType} game
         * @memberof pb.GameCounter
         * @instance
         */
        GameCounter.prototype.game = 0;

        /**
         * GameCounter win.
         * @member {number} win
         * @memberof pb.GameCounter
         * @instance
         */
        GameCounter.prototype.win = 0;

        /**
         * GameCounter lose.
         * @member {number} lose
         * @memberof pb.GameCounter
         * @instance
         */
        GameCounter.prototype.lose = 0;

        /**
         * Creates a new GameCounter instance using the specified properties.
         * @function create
         * @memberof pb.GameCounter
         * @static
         * @param {pb.IGameCounter=} [properties] Properties to set
         * @returns {pb.GameCounter} GameCounter instance
         */
        GameCounter.create = function create(properties) {
            return new GameCounter(properties);
        };

        /**
         * Encodes the specified GameCounter message. Does not implicitly {@link pb.GameCounter.verify|verify} messages.
         * @function encode
         * @memberof pb.GameCounter
         * @static
         * @param {pb.IGameCounter} message GameCounter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameCounter.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.game != null && Object.hasOwnProperty.call(message, "game"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.game);
            if (message.win != null && Object.hasOwnProperty.call(message, "win"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.win);
            if (message.lose != null && Object.hasOwnProperty.call(message, "lose"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.lose);
            return writer;
        };

        /**
         * Encodes the specified GameCounter message, length delimited. Does not implicitly {@link pb.GameCounter.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameCounter
         * @static
         * @param {pb.IGameCounter} message GameCounter message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameCounter.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameCounter message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameCounter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameCounter} GameCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameCounter.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameCounter();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.game = reader.int32();
                        break;
                    case 2:
                        message.win = reader.int32();
                        break;
                    case 3:
                        message.lose = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameCounter message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameCounter
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameCounter} GameCounter
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameCounter.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameCounter message.
         * @function verify
         * @memberof pb.GameCounter
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameCounter.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.game != null && message.hasOwnProperty("game"))
                switch (message.game) {
                    default:
                        return "game: enum value expected";
                    case 0:
                    case 3:
                    case 4:
                    case 17:
                    case 11:
                    case 6:
                    case 1:
                    case 2:
                    case 16:
                    case 15:
                    case 10:
                    case 9:
                    case 7:
                    case 8:
                    case 30:
                        break;
                }
            if (message.win != null && message.hasOwnProperty("win"))
                if (!$util.isInteger(message.win))
                    return "win: integer expected";
            if (message.lose != null && message.hasOwnProperty("lose"))
                if (!$util.isInteger(message.lose))
                    return "lose: integer expected";
            return null;
        };

        /**
         * Creates a GameCounter message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameCounter
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameCounter} GameCounter
         */
        GameCounter.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameCounter)
                return object;
            var message = new $root.pb.GameCounter();
            switch (object.game) {
                case "GameType_NULL":
                case 0:
                    message.game = 0;
                    break;
                case "ShuangMang":
                case 3:
                    message.game = 3;
                    break;
                case "DingXiang":
                case 4:
                    message.game = 4;
                    break;
                case "ZhiBiao":
                case 17:
                    message.game = 17;
                    break;
                case "TiaoJianDan":
                case 11:
                    message.game = 11;
                    break;
                case "QiHuo":
                case 6:
                    message.game = 6;
                    break;
                case "JJ_PK":
                case 1:
                    message.game = 1;
                    break;
                case "JJ_DuoKong":
                case 2:
                    message.game = 2;
                    break;
                case "JJ_ChuangGuan":
                case 16:
                    message.game = 16;
                    break;
                case "JJ_QiHuo":
                case 15:
                    message.game = 15;
                    break;
                case "MoNiChaoGu":
                case 10:
                    message.game = 10;
                    break;
                case "ChaoGuDaSai":
                case 9:
                    message.game = 9;
                    break;
                case "GeGuJingChai":
                case 7:
                    message.game = 7;
                    break;
                case "DaPanJingChai":
                case 8:
                    message.game = 8;
                    break;
                case "MaxGameType":
                case 30:
                    message.game = 30;
                    break;
            }
            if (object.win != null)
                message.win = object.win | 0;
            if (object.lose != null)
                message.lose = object.lose | 0;
            return message;
        };

        /**
         * Creates a plain object from a GameCounter message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameCounter
         * @static
         * @param {pb.GameCounter} message GameCounter
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameCounter.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.game = options.enums === String ? "GameType_NULL" : 0;
                object.win = 0;
                object.lose = 0;
            }
            if (message.game != null && message.hasOwnProperty("game"))
                object.game = options.enums === String ? $root.pb.GameType[message.game] : message.game;
            if (message.win != null && message.hasOwnProperty("win"))
                object.win = message.win;
            if (message.lose != null && message.hasOwnProperty("lose"))
                object.lose = message.lose;
            return object;
        };

        /**
         * Converts this GameCounter to JSON.
         * @function toJSON
         * @memberof pb.GameCounter
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameCounter.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameCounter;
    })();

    pb.SmxlState = (function () {

        /**
         * Properties of a SmxlState.
         * @memberof pb
         * @interface ISmxlState
         * @property {number|Long|null} [resetTs] SmxlState resetTs
         * @property {number|null} [resetCounter] SmxlState resetCounter
         * @property {number|Long|null} [resetTsPremonth] SmxlState resetTsPremonth
         * @property {number|Long|null} [lastMonthReportTs] SmxlState lastMonthReportTs
         */

        /**
         * Constructs a new SmxlState.
         * @memberof pb
         * @classdesc Represents a SmxlState.
         * @implements ISmxlState
         * @constructor
         * @param {pb.ISmxlState=} [properties] Properties to set
         */
        function SmxlState(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * SmxlState resetTs.
         * @member {number|Long} resetTs
         * @memberof pb.SmxlState
         * @instance
         */
        SmxlState.prototype.resetTs = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * SmxlState resetCounter.
         * @member {number} resetCounter
         * @memberof pb.SmxlState
         * @instance
         */
        SmxlState.prototype.resetCounter = 0;

        /**
         * SmxlState resetTsPremonth.
         * @member {number|Long} resetTsPremonth
         * @memberof pb.SmxlState
         * @instance
         */
        SmxlState.prototype.resetTsPremonth = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * SmxlState lastMonthReportTs.
         * @member {number|Long} lastMonthReportTs
         * @memberof pb.SmxlState
         * @instance
         */
        SmxlState.prototype.lastMonthReportTs = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * Creates a new SmxlState instance using the specified properties.
         * @function create
         * @memberof pb.SmxlState
         * @static
         * @param {pb.ISmxlState=} [properties] Properties to set
         * @returns {pb.SmxlState} SmxlState instance
         */
        SmxlState.create = function create(properties) {
            return new SmxlState(properties);
        };

        /**
         * Encodes the specified SmxlState message. Does not implicitly {@link pb.SmxlState.verify|verify} messages.
         * @function encode
         * @memberof pb.SmxlState
         * @static
         * @param {pb.ISmxlState} message SmxlState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SmxlState.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.resetTs != null && Object.hasOwnProperty.call(message, "resetTs"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.resetTs);
            if (message.resetCounter != null && Object.hasOwnProperty.call(message, "resetCounter"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.resetCounter);
            if (message.resetTsPremonth != null && Object.hasOwnProperty.call(message, "resetTsPremonth"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.resetTsPremonth);
            if (message.lastMonthReportTs != null && Object.hasOwnProperty.call(message, "lastMonthReportTs"))
                writer.uint32(/* id 4, wireType 0 =*/32).int64(message.lastMonthReportTs);
            return writer;
        };

        /**
         * Encodes the specified SmxlState message, length delimited. Does not implicitly {@link pb.SmxlState.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.SmxlState
         * @static
         * @param {pb.ISmxlState} message SmxlState message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        SmxlState.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a SmxlState message from the specified reader or buffer.
         * @function decode
         * @memberof pb.SmxlState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.SmxlState} SmxlState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SmxlState.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.SmxlState();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.resetTs = reader.int64();
                        break;
                    case 2:
                        message.resetCounter = reader.int32();
                        break;
                    case 3:
                        message.resetTsPremonth = reader.int64();
                        break;
                    case 4:
                        message.lastMonthReportTs = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a SmxlState message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.SmxlState
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.SmxlState} SmxlState
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        SmxlState.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a SmxlState message.
         * @function verify
         * @memberof pb.SmxlState
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        SmxlState.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.resetTs != null && message.hasOwnProperty("resetTs"))
                if (!$util.isInteger(message.resetTs) && !(message.resetTs && $util.isInteger(message.resetTs.low) && $util.isInteger(message.resetTs.high)))
                    return "resetTs: integer|Long expected";
            if (message.resetCounter != null && message.hasOwnProperty("resetCounter"))
                if (!$util.isInteger(message.resetCounter))
                    return "resetCounter: integer expected";
            if (message.resetTsPremonth != null && message.hasOwnProperty("resetTsPremonth"))
                if (!$util.isInteger(message.resetTsPremonth) && !(message.resetTsPremonth && $util.isInteger(message.resetTsPremonth.low) && $util.isInteger(message.resetTsPremonth.high)))
                    return "resetTsPremonth: integer|Long expected";
            if (message.lastMonthReportTs != null && message.hasOwnProperty("lastMonthReportTs"))
                if (!$util.isInteger(message.lastMonthReportTs) && !(message.lastMonthReportTs && $util.isInteger(message.lastMonthReportTs.low) && $util.isInteger(message.lastMonthReportTs.high)))
                    return "lastMonthReportTs: integer|Long expected";
            return null;
        };

        /**
         * Creates a SmxlState message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.SmxlState
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.SmxlState} SmxlState
         */
        SmxlState.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.SmxlState)
                return object;
            var message = new $root.pb.SmxlState();
            if (object.resetTs != null)
                if ($util.Long)
                    (message.resetTs = $util.Long.fromValue(object.resetTs)).unsigned = false;
                else if (typeof object.resetTs === "string")
                    message.resetTs = parseInt(object.resetTs, 10);
                else if (typeof object.resetTs === "number")
                    message.resetTs = object.resetTs;
                else if (typeof object.resetTs === "object")
                    message.resetTs = new $util.LongBits(object.resetTs.low >>> 0, object.resetTs.high >>> 0).toNumber();
            if (object.resetCounter != null)
                message.resetCounter = object.resetCounter | 0;
            if (object.resetTsPremonth != null)
                if ($util.Long)
                    (message.resetTsPremonth = $util.Long.fromValue(object.resetTsPremonth)).unsigned = false;
                else if (typeof object.resetTsPremonth === "string")
                    message.resetTsPremonth = parseInt(object.resetTsPremonth, 10);
                else if (typeof object.resetTsPremonth === "number")
                    message.resetTsPremonth = object.resetTsPremonth;
                else if (typeof object.resetTsPremonth === "object")
                    message.resetTsPremonth = new $util.LongBits(object.resetTsPremonth.low >>> 0, object.resetTsPremonth.high >>> 0).toNumber();
            if (object.lastMonthReportTs != null)
                if ($util.Long)
                    (message.lastMonthReportTs = $util.Long.fromValue(object.lastMonthReportTs)).unsigned = false;
                else if (typeof object.lastMonthReportTs === "string")
                    message.lastMonthReportTs = parseInt(object.lastMonthReportTs, 10);
                else if (typeof object.lastMonthReportTs === "number")
                    message.lastMonthReportTs = object.lastMonthReportTs;
                else if (typeof object.lastMonthReportTs === "object")
                    message.lastMonthReportTs = new $util.LongBits(object.lastMonthReportTs.low >>> 0, object.lastMonthReportTs.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a SmxlState message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.SmxlState
         * @static
         * @param {pb.SmxlState} message SmxlState
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        SmxlState.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.resetTs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.resetTs = options.longs === String ? "0" : 0;
                object.resetCounter = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.resetTsPremonth = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.resetTsPremonth = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.lastMonthReportTs = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.lastMonthReportTs = options.longs === String ? "0" : 0;
            }
            if (message.resetTs != null && message.hasOwnProperty("resetTs"))
                if (typeof message.resetTs === "number")
                    object.resetTs = options.longs === String ? String(message.resetTs) : message.resetTs;
                else
                    object.resetTs = options.longs === String ? $util.Long.prototype.toString.call(message.resetTs) : options.longs === Number ? new $util.LongBits(message.resetTs.low >>> 0, message.resetTs.high >>> 0).toNumber() : message.resetTs;
            if (message.resetCounter != null && message.hasOwnProperty("resetCounter"))
                object.resetCounter = message.resetCounter;
            if (message.resetTsPremonth != null && message.hasOwnProperty("resetTsPremonth"))
                if (typeof message.resetTsPremonth === "number")
                    object.resetTsPremonth = options.longs === String ? String(message.resetTsPremonth) : message.resetTsPremonth;
                else
                    object.resetTsPremonth = options.longs === String ? $util.Long.prototype.toString.call(message.resetTsPremonth) : options.longs === Number ? new $util.LongBits(message.resetTsPremonth.low >>> 0, message.resetTsPremonth.high >>> 0).toNumber() : message.resetTsPremonth;
            if (message.lastMonthReportTs != null && message.hasOwnProperty("lastMonthReportTs"))
                if (typeof message.lastMonthReportTs === "number")
                    object.lastMonthReportTs = options.longs === String ? String(message.lastMonthReportTs) : message.lastMonthReportTs;
                else
                    object.lastMonthReportTs = options.longs === String ? $util.Long.prototype.toString.call(message.lastMonthReportTs) : options.longs === Number ? new $util.LongBits(message.lastMonthReportTs.low >>> 0, message.lastMonthReportTs.high >>> 0).toNumber() : message.lastMonthReportTs;
            return object;
        };

        /**
         * Converts this SmxlState to JSON.
         * @function toJSON
         * @memberof pb.SmxlState
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        SmxlState.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return SmxlState;
    })();

    pb.GameData = (function () {

        /**
         * Properties of a GameData.
         * @memberof pb
         * @interface IGameData
         * @property {number|null} [uid] GameData uid
         * @property {string|null} [nickname] GameData nickname
         * @property {string|null} [icon] GameData icon
         * @property {Array.<number|Long>|null} [properties] GameData properties
         * @property {Array.<pb.IGameCounter>|null} [counters] GameData counters
         * @property {pb.ISmxlState|null} [smlxState] GameData smlxState
         */

        /**
         * Constructs a new GameData.
         * @memberof pb
         * @classdesc Represents a GameData.
         * @implements IGameData
         * @constructor
         * @param {pb.IGameData=} [properties] Properties to set
         */
        function GameData(properties) {
            this.properties = [];
            this.counters = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameData uid.
         * @member {number} uid
         * @memberof pb.GameData
         * @instance
         */
        GameData.prototype.uid = 0;

        /**
         * GameData nickname.
         * @member {string} nickname
         * @memberof pb.GameData
         * @instance
         */
        GameData.prototype.nickname = "";

        /**
         * GameData icon.
         * @member {string} icon
         * @memberof pb.GameData
         * @instance
         */
        GameData.prototype.icon = "";

        /**
         * GameData properties.
         * @member {Array.<number|Long>} properties
         * @memberof pb.GameData
         * @instance
         */
        GameData.prototype.properties = $util.emptyArray;

        /**
         * GameData counters.
         * @member {Array.<pb.IGameCounter>} counters
         * @memberof pb.GameData
         * @instance
         */
        GameData.prototype.counters = $util.emptyArray;

        /**
         * GameData smlxState.
         * @member {pb.ISmxlState|null|undefined} smlxState
         * @memberof pb.GameData
         * @instance
         */
        GameData.prototype.smlxState = null;

        /**
         * Creates a new GameData instance using the specified properties.
         * @function create
         * @memberof pb.GameData
         * @static
         * @param {pb.IGameData=} [properties] Properties to set
         * @returns {pb.GameData} GameData instance
         */
        GameData.create = function create(properties) {
            return new GameData(properties);
        };

        /**
         * Encodes the specified GameData message. Does not implicitly {@link pb.GameData.verify|verify} messages.
         * @function encode
         * @memberof pb.GameData
         * @static
         * @param {pb.IGameData} message GameData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameData.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.nickname != null && Object.hasOwnProperty.call(message, "nickname"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nickname);
            if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.icon);
            if (message.properties != null && message.properties.length) {
                writer.uint32(/* id 4, wireType 2 =*/34).fork();
                for (var i = 0; i < message.properties.length; ++i)
                    writer.int64(message.properties[i]);
                writer.ldelim();
            }
            if (message.counters != null && message.counters.length)
                for (var i = 0; i < message.counters.length; ++i)
                    $root.pb.GameCounter.encode(message.counters[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
            if (message.smlxState != null && Object.hasOwnProperty.call(message, "smlxState"))
                $root.pb.SmxlState.encode(message.smlxState, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameData message, length delimited. Does not implicitly {@link pb.GameData.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameData
         * @static
         * @param {pb.IGameData} message GameData message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameData.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameData message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameData} GameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameData.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameData();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.nickname = reader.string();
                        break;
                    case 3:
                        message.icon = reader.string();
                        break;
                    case 4:
                        if (!(message.properties && message.properties.length))
                            message.properties = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.properties.push(reader.int64());
                        } else
                            message.properties.push(reader.int64());
                        break;
                    case 5:
                        if (!(message.counters && message.counters.length))
                            message.counters = [];
                        message.counters.push($root.pb.GameCounter.decode(reader, reader.uint32()));
                        break;
                    case 6:
                        message.smlxState = $root.pb.SmxlState.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameData message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameData
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameData} GameData
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameData.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameData message.
         * @function verify
         * @memberof pb.GameData
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameData.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                if (!$util.isString(message.nickname))
                    return "nickname: string expected";
            if (message.icon != null && message.hasOwnProperty("icon"))
                if (!$util.isString(message.icon))
                    return "icon: string expected";
            if (message.properties != null && message.hasOwnProperty("properties")) {
                if (!Array.isArray(message.properties))
                    return "properties: array expected";
                for (var i = 0; i < message.properties.length; ++i)
                    if (!$util.isInteger(message.properties[i]) && !(message.properties[i] && $util.isInteger(message.properties[i].low) && $util.isInteger(message.properties[i].high)))
                        return "properties: integer|Long[] expected";
            }
            if (message.counters != null && message.hasOwnProperty("counters")) {
                if (!Array.isArray(message.counters))
                    return "counters: array expected";
                for (var i = 0; i < message.counters.length; ++i) {
                    var error = $root.pb.GameCounter.verify(message.counters[i]);
                    if (error)
                        return "counters." + error;
                }
            }
            if (message.smlxState != null && message.hasOwnProperty("smlxState")) {
                var error = $root.pb.SmxlState.verify(message.smlxState);
                if (error)
                    return "smlxState." + error;
            }
            return null;
        };

        /**
         * Creates a GameData message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameData
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameData} GameData
         */
        GameData.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameData)
                return object;
            var message = new $root.pb.GameData();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.nickname != null)
                message.nickname = String(object.nickname);
            if (object.icon != null)
                message.icon = String(object.icon);
            if (object.properties) {
                if (!Array.isArray(object.properties))
                    throw TypeError(".pb.GameData.properties: array expected");
                message.properties = [];
                for (var i = 0; i < object.properties.length; ++i)
                    if ($util.Long)
                        (message.properties[i] = $util.Long.fromValue(object.properties[i])).unsigned = false;
                    else if (typeof object.properties[i] === "string")
                        message.properties[i] = parseInt(object.properties[i], 10);
                    else if (typeof object.properties[i] === "number")
                        message.properties[i] = object.properties[i];
                    else if (typeof object.properties[i] === "object")
                        message.properties[i] = new $util.LongBits(object.properties[i].low >>> 0, object.properties[i].high >>> 0).toNumber();
            }
            if (object.counters) {
                if (!Array.isArray(object.counters))
                    throw TypeError(".pb.GameData.counters: array expected");
                message.counters = [];
                for (var i = 0; i < object.counters.length; ++i) {
                    if (typeof object.counters[i] !== "object")
                        throw TypeError(".pb.GameData.counters: object expected");
                    message.counters[i] = $root.pb.GameCounter.fromObject(object.counters[i]);
                }
            }
            if (object.smlxState != null) {
                if (typeof object.smlxState !== "object")
                    throw TypeError(".pb.GameData.smlxState: object expected");
                message.smlxState = $root.pb.SmxlState.fromObject(object.smlxState);
            }
            return message;
        };

        /**
         * Creates a plain object from a GameData message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameData
         * @static
         * @param {pb.GameData} message GameData
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameData.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.properties = [];
                object.counters = [];
            }
            if (options.defaults) {
                object.uid = 0;
                object.nickname = "";
                object.icon = "";
                object.smlxState = null;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.nickname != null && message.hasOwnProperty("nickname"))
                object.nickname = message.nickname;
            if (message.icon != null && message.hasOwnProperty("icon"))
                object.icon = message.icon;
            if (message.properties && message.properties.length) {
                object.properties = [];
                for (var j = 0; j < message.properties.length; ++j)
                    if (typeof message.properties[j] === "number")
                        object.properties[j] = options.longs === String ? String(message.properties[j]) : message.properties[j];
                    else
                        object.properties[j] = options.longs === String ? $util.Long.prototype.toString.call(message.properties[j]) : options.longs === Number ? new $util.LongBits(message.properties[j].low >>> 0, message.properties[j].high >>> 0).toNumber() : message.properties[j];
            }
            if (message.counters && message.counters.length) {
                object.counters = [];
                for (var j = 0; j < message.counters.length; ++j)
                    object.counters[j] = $root.pb.GameCounter.toObject(message.counters[j], options);
            }
            if (message.smlxState != null && message.hasOwnProperty("smlxState"))
                object.smlxState = $root.pb.SmxlState.toObject(message.smlxState, options);
            return object;
        };

        /**
         * Converts this GameData to JSON.
         * @function toJSON
         * @memberof pb.GameData
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameData.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameData;
    })();

    pb.GamePropertyItem = (function () {

        /**
         * Properties of a GamePropertyItem.
         * @memberof pb
         * @interface IGamePropertyItem
         * @property {pb.GamePropertyId|null} [id] GamePropertyItem id
         * @property {number|Long|null} [oldValue] GamePropertyItem oldValue
         * @property {number|Long|null} [newValue] GamePropertyItem newValue
         */

        /**
         * Constructs a new GamePropertyItem.
         * @memberof pb
         * @classdesc Represents a GamePropertyItem.
         * @implements IGamePropertyItem
         * @constructor
         * @param {pb.IGamePropertyItem=} [properties] Properties to set
         */
        function GamePropertyItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GamePropertyItem id.
         * @member {pb.GamePropertyId} id
         * @memberof pb.GamePropertyItem
         * @instance
         */
        GamePropertyItem.prototype.id = 0;

        /**
         * GamePropertyItem oldValue.
         * @member {number|Long} oldValue
         * @memberof pb.GamePropertyItem
         * @instance
         */
        GamePropertyItem.prototype.oldValue = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * GamePropertyItem newValue.
         * @member {number|Long} newValue
         * @memberof pb.GamePropertyItem
         * @instance
         */
        GamePropertyItem.prototype.newValue = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * Creates a new GamePropertyItem instance using the specified properties.
         * @function create
         * @memberof pb.GamePropertyItem
         * @static
         * @param {pb.IGamePropertyItem=} [properties] Properties to set
         * @returns {pb.GamePropertyItem} GamePropertyItem instance
         */
        GamePropertyItem.create = function create(properties) {
            return new GamePropertyItem(properties);
        };

        /**
         * Encodes the specified GamePropertyItem message. Does not implicitly {@link pb.GamePropertyItem.verify|verify} messages.
         * @function encode
         * @memberof pb.GamePropertyItem
         * @static
         * @param {pb.IGamePropertyItem} message GamePropertyItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePropertyItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
            if (message.oldValue != null && Object.hasOwnProperty.call(message, "oldValue"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.oldValue);
            if (message.newValue != null && Object.hasOwnProperty.call(message, "newValue"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.newValue);
            return writer;
        };

        /**
         * Encodes the specified GamePropertyItem message, length delimited. Does not implicitly {@link pb.GamePropertyItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GamePropertyItem
         * @static
         * @param {pb.IGamePropertyItem} message GamePropertyItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GamePropertyItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GamePropertyItem message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GamePropertyItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GamePropertyItem} GamePropertyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePropertyItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GamePropertyItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.id = reader.int32();
                        break;
                    case 2:
                        message.oldValue = reader.int64();
                        break;
                    case 3:
                        message.newValue = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GamePropertyItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GamePropertyItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GamePropertyItem} GamePropertyItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GamePropertyItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GamePropertyItem message.
         * @function verify
         * @memberof pb.GamePropertyItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GamePropertyItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.id != null && message.hasOwnProperty("id"))
                switch (message.id) {
                    default:
                        return "id: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 30:
                        break;
                }
            if (message.oldValue != null && message.hasOwnProperty("oldValue"))
                if (!$util.isInteger(message.oldValue) && !(message.oldValue && $util.isInteger(message.oldValue.low) && $util.isInteger(message.oldValue.high)))
                    return "oldValue: integer|Long expected";
            if (message.newValue != null && message.hasOwnProperty("newValue"))
                if (!$util.isInteger(message.newValue) && !(message.newValue && $util.isInteger(message.newValue.low) && $util.isInteger(message.newValue.high)))
                    return "newValue: integer|Long expected";
            return null;
        };

        /**
         * Creates a GamePropertyItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GamePropertyItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GamePropertyItem} GamePropertyItem
         */
        GamePropertyItem.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GamePropertyItem)
                return object;
            var message = new $root.pb.GamePropertyItem();
            switch (object.id) {
                case "Gold":
                case 0:
                    message.id = 0;
                    break;
                case "Exp":
                case 1:
                    message.id = 1;
                    break;
                case "Level":
                case 2:
                    message.id = 2;
                    break;
                case "ShuangMang_Gold":
                case 3:
                    message.id = 3;
                    break;
                case "Diamond":
                case 4:
                    message.id = 4;
                    break;
                case "Max":
                case 30:
                    message.id = 30;
                    break;
            }
            if (object.oldValue != null)
                if ($util.Long)
                    (message.oldValue = $util.Long.fromValue(object.oldValue)).unsigned = false;
                else if (typeof object.oldValue === "string")
                    message.oldValue = parseInt(object.oldValue, 10);
                else if (typeof object.oldValue === "number")
                    message.oldValue = object.oldValue;
                else if (typeof object.oldValue === "object")
                    message.oldValue = new $util.LongBits(object.oldValue.low >>> 0, object.oldValue.high >>> 0).toNumber();
            if (object.newValue != null)
                if ($util.Long)
                    (message.newValue = $util.Long.fromValue(object.newValue)).unsigned = false;
                else if (typeof object.newValue === "string")
                    message.newValue = parseInt(object.newValue, 10);
                else if (typeof object.newValue === "number")
                    message.newValue = object.newValue;
                else if (typeof object.newValue === "object")
                    message.newValue = new $util.LongBits(object.newValue.low >>> 0, object.newValue.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GamePropertyItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GamePropertyItem
         * @static
         * @param {pb.GamePropertyItem} message GamePropertyItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GamePropertyItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.id = options.enums === String ? "Gold" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.oldValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.oldValue = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.newValue = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.newValue = options.longs === String ? "0" : 0;
            }
            if (message.id != null && message.hasOwnProperty("id"))
                object.id = options.enums === String ? $root.pb.GamePropertyId[message.id] : message.id;
            if (message.oldValue != null && message.hasOwnProperty("oldValue"))
                if (typeof message.oldValue === "number")
                    object.oldValue = options.longs === String ? String(message.oldValue) : message.oldValue;
                else
                    object.oldValue = options.longs === String ? $util.Long.prototype.toString.call(message.oldValue) : options.longs === Number ? new $util.LongBits(message.oldValue.low >>> 0, message.oldValue.high >>> 0).toNumber() : message.oldValue;
            if (message.newValue != null && message.hasOwnProperty("newValue"))
                if (typeof message.newValue === "number")
                    object.newValue = options.longs === String ? String(message.newValue) : message.newValue;
                else
                    object.newValue = options.longs === String ? $util.Long.prototype.toString.call(message.newValue) : options.longs === Number ? new $util.LongBits(message.newValue.low >>> 0, message.newValue.high >>> 0).toNumber() : message.newValue;
            return object;
        };

        /**
         * Converts this GamePropertyItem to JSON.
         * @function toJSON
         * @memberof pb.GamePropertyItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GamePropertyItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GamePropertyItem;
    })();

    pb.GameProperties = (function () {

        /**
         * Properties of a GameProperties.
         * @memberof pb
         * @interface IGameProperties
         * @property {Array.<pb.IGamePropertyItem>|null} [items] GameProperties items
         */

        /**
         * Constructs a new GameProperties.
         * @memberof pb
         * @classdesc Represents a GameProperties.
         * @implements IGameProperties
         * @constructor
         * @param {pb.IGameProperties=} [properties] Properties to set
         */
        function GameProperties(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameProperties items.
         * @member {Array.<pb.IGamePropertyItem>} items
         * @memberof pb.GameProperties
         * @instance
         */
        GameProperties.prototype.items = $util.emptyArray;

        /**
         * Creates a new GameProperties instance using the specified properties.
         * @function create
         * @memberof pb.GameProperties
         * @static
         * @param {pb.IGameProperties=} [properties] Properties to set
         * @returns {pb.GameProperties} GameProperties instance
         */
        GameProperties.create = function create(properties) {
            return new GameProperties(properties);
        };

        /**
         * Encodes the specified GameProperties message. Does not implicitly {@link pb.GameProperties.verify|verify} messages.
         * @function encode
         * @memberof pb.GameProperties
         * @static
         * @param {pb.IGameProperties} message GameProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameProperties.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.pb.GamePropertyItem.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameProperties message, length delimited. Does not implicitly {@link pb.GameProperties.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameProperties
         * @static
         * @param {pb.IGameProperties} message GameProperties message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameProperties.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameProperties message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameProperties} GameProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameProperties.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameProperties();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.pb.GamePropertyItem.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameProperties message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameProperties
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameProperties} GameProperties
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameProperties.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameProperties message.
         * @function verify
         * @memberof pb.GameProperties
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameProperties.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.pb.GamePropertyItem.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameProperties message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameProperties
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameProperties} GameProperties
         */
        GameProperties.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameProperties)
                return object;
            var message = new $root.pb.GameProperties();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".pb.GameProperties.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".pb.GameProperties.items: object expected");
                    message.items[i] = $root.pb.GamePropertyItem.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameProperties message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameProperties
         * @static
         * @param {pb.GameProperties} message GameProperties
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameProperties.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.pb.GamePropertyItem.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this GameProperties to JSON.
         * @function toJSON
         * @memberof pb.GameProperties
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameProperties.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameProperties;
    })();

    pb.GameResult = (function () {

        /**
         * Properties of a GameResult.
         * @memberof pb
         * @interface IGameResult
         * @property {number|null} [uid] GameResult uid
         * @property {pb.GameType|null} [gType] GameResult gType
         * @property {number|null} [quotesCode] GameResult quotesCode
         * @property {pb.KType|null} [kType] GameResult kType
         * @property {number|null} [kFrom] GameResult kFrom
         * @property {number|null} [kTo] GameResult kTo
         * @property {number|null} [stockProfitRate] GameResult stockProfitRate
         * @property {number|null} [userProfitRate] GameResult userProfitRate
         * @property {number|Long|null} [userCapital] GameResult userCapital
         * @property {number|Long|null} [userProfit] GameResult userProfit
         * @property {number|Long|null} [ts] GameResult ts
         * @property {number|null} [rank] GameResult rank
         * @property {number|Long|null} [refId] GameResult refId
         */

        /**
         * Constructs a new GameResult.
         * @memberof pb
         * @classdesc Represents a GameResult.
         * @implements IGameResult
         * @constructor
         * @param {pb.IGameResult=} [properties] Properties to set
         */
        function GameResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameResult uid.
         * @member {number} uid
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.uid = 0;

        /**
         * GameResult gType.
         * @member {pb.GameType} gType
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.gType = 0;

        /**
         * GameResult quotesCode.
         * @member {number} quotesCode
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.quotesCode = 0;

        /**
         * GameResult kType.
         * @member {pb.KType} kType
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.kType = 0;

        /**
         * GameResult kFrom.
         * @member {number} kFrom
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.kFrom = 0;

        /**
         * GameResult kTo.
         * @member {number} kTo
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.kTo = 0;

        /**
         * GameResult stockProfitRate.
         * @member {number} stockProfitRate
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.stockProfitRate = 0;

        /**
         * GameResult userProfitRate.
         * @member {number} userProfitRate
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.userProfitRate = 0;

        /**
         * GameResult userCapital.
         * @member {number|Long} userCapital
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.userCapital = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * GameResult userProfit.
         * @member {number|Long} userProfit
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.userProfit = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * GameResult ts.
         * @member {number|Long} ts
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.ts = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * GameResult rank.
         * @member {number} rank
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.rank = 0;

        /**
         * GameResult refId.
         * @member {number|Long} refId
         * @memberof pb.GameResult
         * @instance
         */
        GameResult.prototype.refId = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * Creates a new GameResult instance using the specified properties.
         * @function create
         * @memberof pb.GameResult
         * @static
         * @param {pb.IGameResult=} [properties] Properties to set
         * @returns {pb.GameResult} GameResult instance
         */
        GameResult.create = function create(properties) {
            return new GameResult(properties);
        };

        /**
         * Encodes the specified GameResult message. Does not implicitly {@link pb.GameResult.verify|verify} messages.
         * @function encode
         * @memberof pb.GameResult
         * @static
         * @param {pb.IGameResult} message GameResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.gType != null && Object.hasOwnProperty.call(message, "gType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.gType);
            if (message.quotesCode != null && Object.hasOwnProperty.call(message, "quotesCode"))
                writer.uint32(/* id 3, wireType 0 =*/24).int32(message.quotesCode);
            if (message.kType != null && Object.hasOwnProperty.call(message, "kType"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.kType);
            if (message.kFrom != null && Object.hasOwnProperty.call(message, "kFrom"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.kFrom);
            if (message.kTo != null && Object.hasOwnProperty.call(message, "kTo"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.kTo);
            if (message.stockProfitRate != null && Object.hasOwnProperty.call(message, "stockProfitRate"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.stockProfitRate);
            if (message.userProfitRate != null && Object.hasOwnProperty.call(message, "userProfitRate"))
                writer.uint32(/* id 8, wireType 1 =*/65).double(message.userProfitRate);
            if (message.userCapital != null && Object.hasOwnProperty.call(message, "userCapital"))
                writer.uint32(/* id 9, wireType 0 =*/72).int64(message.userCapital);
            if (message.userProfit != null && Object.hasOwnProperty.call(message, "userProfit"))
                writer.uint32(/* id 10, wireType 0 =*/80).int64(message.userProfit);
            if (message.ts != null && Object.hasOwnProperty.call(message, "ts"))
                writer.uint32(/* id 11, wireType 0 =*/88).int64(message.ts);
            if (message.rank != null && Object.hasOwnProperty.call(message, "rank"))
                writer.uint32(/* id 12, wireType 0 =*/96).int32(message.rank);
            if (message.refId != null && Object.hasOwnProperty.call(message, "refId"))
                writer.uint32(/* id 13, wireType 0 =*/104).int64(message.refId);
            return writer;
        };

        /**
         * Encodes the specified GameResult message, length delimited. Does not implicitly {@link pb.GameResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameResult
         * @static
         * @param {pb.IGameResult} message GameResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameResult message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameResult} GameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.gType = reader.int32();
                        break;
                    case 3:
                        message.quotesCode = reader.int32();
                        break;
                    case 4:
                        message.kType = reader.int32();
                        break;
                    case 5:
                        message.kFrom = reader.int32();
                        break;
                    case 6:
                        message.kTo = reader.int32();
                        break;
                    case 7:
                        message.stockProfitRate = reader.double();
                        break;
                    case 8:
                        message.userProfitRate = reader.double();
                        break;
                    case 9:
                        message.userCapital = reader.int64();
                        break;
                    case 10:
                        message.userProfit = reader.int64();
                        break;
                    case 11:
                        message.ts = reader.int64();
                        break;
                    case 12:
                        message.rank = reader.int32();
                        break;
                    case 13:
                        message.refId = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameResult} GameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameResult message.
         * @function verify
         * @memberof pb.GameResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.gType != null && message.hasOwnProperty("gType"))
                switch (message.gType) {
                    default:
                        return "gType: enum value expected";
                    case 0:
                    case 3:
                    case 4:
                    case 17:
                    case 11:
                    case 6:
                    case 1:
                    case 2:
                    case 16:
                    case 15:
                    case 10:
                    case 9:
                    case 7:
                    case 8:
                    case 30:
                        break;
                }
            if (message.quotesCode != null && message.hasOwnProperty("quotesCode"))
                if (!$util.isInteger(message.quotesCode))
                    return "quotesCode: integer expected";
            if (message.kType != null && message.hasOwnProperty("kType"))
                switch (message.kType) {
                    default:
                        return "kType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 10:
                    case 11:
                        break;
                }
            if (message.kFrom != null && message.hasOwnProperty("kFrom"))
                if (!$util.isInteger(message.kFrom))
                    return "kFrom: integer expected";
            if (message.kTo != null && message.hasOwnProperty("kTo"))
                if (!$util.isInteger(message.kTo))
                    return "kTo: integer expected";
            if (message.stockProfitRate != null && message.hasOwnProperty("stockProfitRate"))
                if (typeof message.stockProfitRate !== "number")
                    return "stockProfitRate: number expected";
            if (message.userProfitRate != null && message.hasOwnProperty("userProfitRate"))
                if (typeof message.userProfitRate !== "number")
                    return "userProfitRate: number expected";
            if (message.userCapital != null && message.hasOwnProperty("userCapital"))
                if (!$util.isInteger(message.userCapital) && !(message.userCapital && $util.isInteger(message.userCapital.low) && $util.isInteger(message.userCapital.high)))
                    return "userCapital: integer|Long expected";
            if (message.userProfit != null && message.hasOwnProperty("userProfit"))
                if (!$util.isInteger(message.userProfit) && !(message.userProfit && $util.isInteger(message.userProfit.low) && $util.isInteger(message.userProfit.high)))
                    return "userProfit: integer|Long expected";
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                    return "ts: integer|Long expected";
            if (message.rank != null && message.hasOwnProperty("rank"))
                if (!$util.isInteger(message.rank))
                    return "rank: integer expected";
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (!$util.isInteger(message.refId) && !(message.refId && $util.isInteger(message.refId.low) && $util.isInteger(message.refId.high)))
                    return "refId: integer|Long expected";
            return null;
        };

        /**
         * Creates a GameResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameResult} GameResult
         */
        GameResult.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameResult)
                return object;
            var message = new $root.pb.GameResult();
            if (object.uid != null)
                message.uid = object.uid | 0;
            switch (object.gType) {
                case "GameType_NULL":
                case 0:
                    message.gType = 0;
                    break;
                case "ShuangMang":
                case 3:
                    message.gType = 3;
                    break;
                case "DingXiang":
                case 4:
                    message.gType = 4;
                    break;
                case "ZhiBiao":
                case 17:
                    message.gType = 17;
                    break;
                case "TiaoJianDan":
                case 11:
                    message.gType = 11;
                    break;
                case "QiHuo":
                case 6:
                    message.gType = 6;
                    break;
                case "JJ_PK":
                case 1:
                    message.gType = 1;
                    break;
                case "JJ_DuoKong":
                case 2:
                    message.gType = 2;
                    break;
                case "JJ_ChuangGuan":
                case 16:
                    message.gType = 16;
                    break;
                case "JJ_QiHuo":
                case 15:
                    message.gType = 15;
                    break;
                case "MoNiChaoGu":
                case 10:
                    message.gType = 10;
                    break;
                case "ChaoGuDaSai":
                case 9:
                    message.gType = 9;
                    break;
                case "GeGuJingChai":
                case 7:
                    message.gType = 7;
                    break;
                case "DaPanJingChai":
                case 8:
                    message.gType = 8;
                    break;
                case "MaxGameType":
                case 30:
                    message.gType = 30;
                    break;
            }
            if (object.quotesCode != null)
                message.quotesCode = object.quotesCode | 0;
            switch (object.kType) {
                case "KType_NULL":
                case 0:
                    message.kType = 0;
                    break;
                case "Real":
                case 1:
                    message.kType = 1;
                    break;
                case "Min":
                case 2:
                    message.kType = 2;
                    break;
                case "MinToday":
                case 3:
                    message.kType = 3;
                    break;
                case "Min5":
                case 4:
                    message.kType = 4;
                    break;
                case "Min15":
                case 5:
                    message.kType = 5;
                    break;
                case "Min30":
                case 6:
                    message.kType = 6;
                    break;
                case "Min60":
                case 7:
                    message.kType = 7;
                    break;
                case "Day":
                case 10:
                    message.kType = 10;
                    break;
                case "Day7":
                case 11:
                    message.kType = 11;
                    break;
            }
            if (object.kFrom != null)
                message.kFrom = object.kFrom | 0;
            if (object.kTo != null)
                message.kTo = object.kTo | 0;
            if (object.stockProfitRate != null)
                message.stockProfitRate = Number(object.stockProfitRate);
            if (object.userProfitRate != null)
                message.userProfitRate = Number(object.userProfitRate);
            if (object.userCapital != null)
                if ($util.Long)
                    (message.userCapital = $util.Long.fromValue(object.userCapital)).unsigned = false;
                else if (typeof object.userCapital === "string")
                    message.userCapital = parseInt(object.userCapital, 10);
                else if (typeof object.userCapital === "number")
                    message.userCapital = object.userCapital;
                else if (typeof object.userCapital === "object")
                    message.userCapital = new $util.LongBits(object.userCapital.low >>> 0, object.userCapital.high >>> 0).toNumber();
            if (object.userProfit != null)
                if ($util.Long)
                    (message.userProfit = $util.Long.fromValue(object.userProfit)).unsigned = false;
                else if (typeof object.userProfit === "string")
                    message.userProfit = parseInt(object.userProfit, 10);
                else if (typeof object.userProfit === "number")
                    message.userProfit = object.userProfit;
                else if (typeof object.userProfit === "object")
                    message.userProfit = new $util.LongBits(object.userProfit.low >>> 0, object.userProfit.high >>> 0).toNumber();
            if (object.ts != null)
                if ($util.Long)
                    (message.ts = $util.Long.fromValue(object.ts)).unsigned = false;
                else if (typeof object.ts === "string")
                    message.ts = parseInt(object.ts, 10);
                else if (typeof object.ts === "number")
                    message.ts = object.ts;
                else if (typeof object.ts === "object")
                    message.ts = new $util.LongBits(object.ts.low >>> 0, object.ts.high >>> 0).toNumber();
            if (object.rank != null)
                message.rank = object.rank | 0;
            if (object.refId != null)
                if ($util.Long)
                    (message.refId = $util.Long.fromValue(object.refId)).unsigned = false;
                else if (typeof object.refId === "string")
                    message.refId = parseInt(object.refId, 10);
                else if (typeof object.refId === "number")
                    message.refId = object.refId;
                else if (typeof object.refId === "object")
                    message.refId = new $util.LongBits(object.refId.low >>> 0, object.refId.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GameResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameResult
         * @static
         * @param {pb.GameResult} message GameResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.gType = options.enums === String ? "GameType_NULL" : 0;
                object.quotesCode = 0;
                object.kType = options.enums === String ? "KType_NULL" : 0;
                object.kFrom = 0;
                object.kTo = 0;
                object.stockProfitRate = 0;
                object.userProfitRate = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.userCapital = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.userCapital = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.userProfit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.userProfit = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ts = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ts = options.longs === String ? "0" : 0;
                object.rank = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.refId = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.refId = options.longs === String ? "0" : 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.gType != null && message.hasOwnProperty("gType"))
                object.gType = options.enums === String ? $root.pb.GameType[message.gType] : message.gType;
            if (message.quotesCode != null && message.hasOwnProperty("quotesCode"))
                object.quotesCode = message.quotesCode;
            if (message.kType != null && message.hasOwnProperty("kType"))
                object.kType = options.enums === String ? $root.pb.KType[message.kType] : message.kType;
            if (message.kFrom != null && message.hasOwnProperty("kFrom"))
                object.kFrom = message.kFrom;
            if (message.kTo != null && message.hasOwnProperty("kTo"))
                object.kTo = message.kTo;
            if (message.stockProfitRate != null && message.hasOwnProperty("stockProfitRate"))
                object.stockProfitRate = options.json && !isFinite(message.stockProfitRate) ? String(message.stockProfitRate) : message.stockProfitRate;
            if (message.userProfitRate != null && message.hasOwnProperty("userProfitRate"))
                object.userProfitRate = options.json && !isFinite(message.userProfitRate) ? String(message.userProfitRate) : message.userProfitRate;
            if (message.userCapital != null && message.hasOwnProperty("userCapital"))
                if (typeof message.userCapital === "number")
                    object.userCapital = options.longs === String ? String(message.userCapital) : message.userCapital;
                else
                    object.userCapital = options.longs === String ? $util.Long.prototype.toString.call(message.userCapital) : options.longs === Number ? new $util.LongBits(message.userCapital.low >>> 0, message.userCapital.high >>> 0).toNumber() : message.userCapital;
            if (message.userProfit != null && message.hasOwnProperty("userProfit"))
                if (typeof message.userProfit === "number")
                    object.userProfit = options.longs === String ? String(message.userProfit) : message.userProfit;
                else
                    object.userProfit = options.longs === String ? $util.Long.prototype.toString.call(message.userProfit) : options.longs === Number ? new $util.LongBits(message.userProfit.low >>> 0, message.userProfit.high >>> 0).toNumber() : message.userProfit;
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (typeof message.ts === "number")
                    object.ts = options.longs === String ? String(message.ts) : message.ts;
                else
                    object.ts = options.longs === String ? $util.Long.prototype.toString.call(message.ts) : options.longs === Number ? new $util.LongBits(message.ts.low >>> 0, message.ts.high >>> 0).toNumber() : message.ts;
            if (message.rank != null && message.hasOwnProperty("rank"))
                object.rank = message.rank;
            if (message.refId != null && message.hasOwnProperty("refId"))
                if (typeof message.refId === "number")
                    object.refId = options.longs === String ? String(message.refId) : message.refId;
                else
                    object.refId = options.longs === String ? $util.Long.prototype.toString.call(message.refId) : options.longs === Number ? new $util.LongBits(message.refId.low >>> 0, message.refId.high >>> 0).toNumber() : message.refId;
            return object;
        };

        /**
         * Converts this GameResult to JSON.
         * @function toJSON
         * @memberof pb.GameResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameResult;
    })();

    pb.GameOperationItem = (function () {

        /**
         * Properties of a GameOperationItem.
         * @memberof pb
         * @interface IGameOperationItem
         * @property {number|null} [ts] GameOperationItem ts
         * @property {pb.GameOperationId|null} [opId] GameOperationItem opId
         * @property {number|Long|null} [opVal] GameOperationItem opVal
         */

        /**
         * Constructs a new GameOperationItem.
         * @memberof pb
         * @classdesc Represents a GameOperationItem.
         * @implements IGameOperationItem
         * @constructor
         * @param {pb.IGameOperationItem=} [properties] Properties to set
         */
        function GameOperationItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameOperationItem ts.
         * @member {number} ts
         * @memberof pb.GameOperationItem
         * @instance
         */
        GameOperationItem.prototype.ts = 0;

        /**
         * GameOperationItem opId.
         * @member {pb.GameOperationId} opId
         * @memberof pb.GameOperationItem
         * @instance
         */
        GameOperationItem.prototype.opId = 0;

        /**
         * GameOperationItem opVal.
         * @member {number|Long} opVal
         * @memberof pb.GameOperationItem
         * @instance
         */
        GameOperationItem.prototype.opVal = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * Creates a new GameOperationItem instance using the specified properties.
         * @function create
         * @memberof pb.GameOperationItem
         * @static
         * @param {pb.IGameOperationItem=} [properties] Properties to set
         * @returns {pb.GameOperationItem} GameOperationItem instance
         */
        GameOperationItem.create = function create(properties) {
            return new GameOperationItem(properties);
        };

        /**
         * Encodes the specified GameOperationItem message. Does not implicitly {@link pb.GameOperationItem.verify|verify} messages.
         * @function encode
         * @memberof pb.GameOperationItem
         * @static
         * @param {pb.IGameOperationItem} message GameOperationItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOperationItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ts != null && Object.hasOwnProperty.call(message, "ts"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ts);
            if (message.opId != null && Object.hasOwnProperty.call(message, "opId"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.opId);
            if (message.opVal != null && Object.hasOwnProperty.call(message, "opVal"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.opVal);
            return writer;
        };

        /**
         * Encodes the specified GameOperationItem message, length delimited. Does not implicitly {@link pb.GameOperationItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameOperationItem
         * @static
         * @param {pb.IGameOperationItem} message GameOperationItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOperationItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameOperationItem message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameOperationItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameOperationItem} GameOperationItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOperationItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameOperationItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.ts = reader.int32();
                        break;
                    case 2:
                        message.opId = reader.int32();
                        break;
                    case 3:
                        message.opVal = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameOperationItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameOperationItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameOperationItem} GameOperationItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOperationItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameOperationItem message.
         * @function verify
         * @memberof pb.GameOperationItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameOperationItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (!$util.isInteger(message.ts))
                    return "ts: integer expected";
            if (message.opId != null && message.hasOwnProperty("opId"))
                switch (message.opId) {
                    default:
                        return "opId: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 8:
                    case 9:
                    case 150:
                        break;
                }
            if (message.opVal != null && message.hasOwnProperty("opVal"))
                if (!$util.isInteger(message.opVal) && !(message.opVal && $util.isInteger(message.opVal.low) && $util.isInteger(message.opVal.high)))
                    return "opVal: integer|Long expected";
            return null;
        };

        /**
         * Creates a GameOperationItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameOperationItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameOperationItem} GameOperationItem
         */
        GameOperationItem.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameOperationItem)
                return object;
            var message = new $root.pb.GameOperationItem();
            if (object.ts != null)
                message.ts = object.ts | 0;
            switch (object.opId) {
                case "GameOperationId_NULL":
                case 0:
                    message.opId = 0;
                    break;
                case "Ask":
                case 1:
                    message.opId = 1;
                    break;
                case "Bid":
                case 2:
                    message.opId = 2;
                    break;
                case "Wait":
                case 3:
                    message.opId = 3;
                    break;
                case "Hold":
                case 4:
                    message.opId = 4;
                    break;
                case "Ask_Force":
                case 5:
                    message.opId = 5;
                    break;
                case "Long":
                case 8:
                    message.opId = 8;
                    break;
                case "Short":
                case 9:
                    message.opId = 9;
                    break;
                case "END":
                case 150:
                    message.opId = 150;
                    break;
            }
            if (object.opVal != null)
                if ($util.Long)
                    (message.opVal = $util.Long.fromValue(object.opVal)).unsigned = false;
                else if (typeof object.opVal === "string")
                    message.opVal = parseInt(object.opVal, 10);
                else if (typeof object.opVal === "number")
                    message.opVal = object.opVal;
                else if (typeof object.opVal === "object")
                    message.opVal = new $util.LongBits(object.opVal.low >>> 0, object.opVal.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a GameOperationItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameOperationItem
         * @static
         * @param {pb.GameOperationItem} message GameOperationItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameOperationItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ts = 0;
                object.opId = options.enums === String ? "GameOperationId_NULL" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.opVal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.opVal = options.longs === String ? "0" : 0;
            }
            if (message.ts != null && message.hasOwnProperty("ts"))
                object.ts = message.ts;
            if (message.opId != null && message.hasOwnProperty("opId"))
                object.opId = options.enums === String ? $root.pb.GameOperationId[message.opId] : message.opId;
            if (message.opVal != null && message.hasOwnProperty("opVal"))
                if (typeof message.opVal === "number")
                    object.opVal = options.longs === String ? String(message.opVal) : message.opVal;
                else
                    object.opVal = options.longs === String ? $util.Long.prototype.toString.call(message.opVal) : options.longs === Number ? new $util.LongBits(message.opVal.low >>> 0, message.opVal.high >>> 0).toNumber() : message.opVal;
            return object;
        };

        /**
         * Converts this GameOperationItem to JSON.
         * @function toJSON
         * @memberof pb.GameOperationItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameOperationItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameOperationItem;
    })();

    pb.GameOperations = (function () {

        /**
         * Properties of a GameOperations.
         * @memberof pb
         * @interface IGameOperations
         * @property {number|null} [code] GameOperations code
         * @property {pb.KType|null} [kType] GameOperations kType
         * @property {Array.<pb.IGameOperationItem>|null} [items] GameOperations items
         */

        /**
         * Constructs a new GameOperations.
         * @memberof pb
         * @classdesc Represents a GameOperations.
         * @implements IGameOperations
         * @constructor
         * @param {pb.IGameOperations=} [properties] Properties to set
         */
        function GameOperations(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * GameOperations code.
         * @member {number} code
         * @memberof pb.GameOperations
         * @instance
         */
        GameOperations.prototype.code = 0;

        /**
         * GameOperations kType.
         * @member {pb.KType} kType
         * @memberof pb.GameOperations
         * @instance
         */
        GameOperations.prototype.kType = 0;

        /**
         * GameOperations items.
         * @member {Array.<pb.IGameOperationItem>} items
         * @memberof pb.GameOperations
         * @instance
         */
        GameOperations.prototype.items = $util.emptyArray;

        /**
         * Creates a new GameOperations instance using the specified properties.
         * @function create
         * @memberof pb.GameOperations
         * @static
         * @param {pb.IGameOperations=} [properties] Properties to set
         * @returns {pb.GameOperations} GameOperations instance
         */
        GameOperations.create = function create(properties) {
            return new GameOperations(properties);
        };

        /**
         * Encodes the specified GameOperations message. Does not implicitly {@link pb.GameOperations.verify|verify} messages.
         * @function encode
         * @memberof pb.GameOperations
         * @static
         * @param {pb.IGameOperations} message GameOperations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOperations.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.code);
            if (message.kType != null && Object.hasOwnProperty.call(message, "kType"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.kType);
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.pb.GameOperationItem.encode(message.items[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified GameOperations message, length delimited. Does not implicitly {@link pb.GameOperations.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.GameOperations
         * @static
         * @param {pb.IGameOperations} message GameOperations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        GameOperations.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a GameOperations message from the specified reader or buffer.
         * @function decode
         * @memberof pb.GameOperations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.GameOperations} GameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOperations.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.GameOperations();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.code = reader.int32();
                        break;
                    case 2:
                        message.kType = reader.int32();
                        break;
                    case 3:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.pb.GameOperationItem.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a GameOperations message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.GameOperations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.GameOperations} GameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        GameOperations.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a GameOperations message.
         * @function verify
         * @memberof pb.GameOperations
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        GameOperations.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.kType != null && message.hasOwnProperty("kType"))
                switch (message.kType) {
                    default:
                        return "kType: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 10:
                    case 11:
                        break;
                }
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.pb.GameOperationItem.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a GameOperations message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.GameOperations
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.GameOperations} GameOperations
         */
        GameOperations.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.GameOperations)
                return object;
            var message = new $root.pb.GameOperations();
            if (object.code != null)
                message.code = object.code | 0;
            switch (object.kType) {
                case "KType_NULL":
                case 0:
                    message.kType = 0;
                    break;
                case "Real":
                case 1:
                    message.kType = 1;
                    break;
                case "Min":
                case 2:
                    message.kType = 2;
                    break;
                case "MinToday":
                case 3:
                    message.kType = 3;
                    break;
                case "Min5":
                case 4:
                    message.kType = 4;
                    break;
                case "Min15":
                case 5:
                    message.kType = 5;
                    break;
                case "Min30":
                case 6:
                    message.kType = 6;
                    break;
                case "Min60":
                case 7:
                    message.kType = 7;
                    break;
                case "Day":
                case 10:
                    message.kType = 10;
                    break;
                case "Day7":
                case 11:
                    message.kType = 11;
                    break;
            }
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".pb.GameOperations.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".pb.GameOperations.items: object expected");
                    message.items[i] = $root.pb.GameOperationItem.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a GameOperations message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.GameOperations
         * @static
         * @param {pb.GameOperations} message GameOperations
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        GameOperations.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (options.defaults) {
                object.code = 0;
                object.kType = options.enums === String ? "KType_NULL" : 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.kType != null && message.hasOwnProperty("kType"))
                object.kType = options.enums === String ? $root.pb.KType[message.kType] : message.kType;
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.pb.GameOperationItem.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this GameOperations to JSON.
         * @function toJSON
         * @memberof pb.GameOperations
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        GameOperations.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return GameOperations;
    })();

    pb.CmdGameLogin = (function () {

        /**
         * Properties of a CmdGameLogin.
         * @memberof pb
         * @interface ICmdGameLogin
         * @property {number|null} [uid] CmdGameLogin uid
         * @property {string|null} [token] CmdGameLogin token
         */

        /**
         * Constructs a new CmdGameLogin.
         * @memberof pb
         * @classdesc Represents a CmdGameLogin.
         * @implements ICmdGameLogin
         * @constructor
         * @param {pb.ICmdGameLogin=} [properties] Properties to set
         */
        function CmdGameLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGameLogin uid.
         * @member {number} uid
         * @memberof pb.CmdGameLogin
         * @instance
         */
        CmdGameLogin.prototype.uid = 0;

        /**
         * CmdGameLogin token.
         * @member {string} token
         * @memberof pb.CmdGameLogin
         * @instance
         */
        CmdGameLogin.prototype.token = "";

        /**
         * Creates a new CmdGameLogin instance using the specified properties.
         * @function create
         * @memberof pb.CmdGameLogin
         * @static
         * @param {pb.ICmdGameLogin=} [properties] Properties to set
         * @returns {pb.CmdGameLogin} CmdGameLogin instance
         */
        CmdGameLogin.create = function create(properties) {
            return new CmdGameLogin(properties);
        };

        /**
         * Encodes the specified CmdGameLogin message. Does not implicitly {@link pb.CmdGameLogin.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGameLogin
         * @static
         * @param {pb.ICmdGameLogin} message CmdGameLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.token);
            return writer;
        };

        /**
         * Encodes the specified CmdGameLogin message, length delimited. Does not implicitly {@link pb.CmdGameLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGameLogin
         * @static
         * @param {pb.ICmdGameLogin} message CmdGameLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGameLogin message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGameLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGameLogin} CmdGameLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGameLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.token = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGameLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGameLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGameLogin} CmdGameLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGameLogin message.
         * @function verify
         * @memberof pb.CmdGameLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGameLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            return null;
        };

        /**
         * Creates a CmdGameLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGameLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGameLogin} CmdGameLogin
         */
        CmdGameLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGameLogin)
                return object;
            var message = new $root.pb.CmdGameLogin();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.token != null)
                message.token = String(object.token);
            return message;
        };

        /**
         * Creates a plain object from a CmdGameLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGameLogin
         * @static
         * @param {pb.CmdGameLogin} message CmdGameLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGameLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.token = "";
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            return object;
        };

        /**
         * Converts this CmdGameLogin to JSON.
         * @function toJSON
         * @memberof pb.CmdGameLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGameLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGameLogin;
    })();

    pb.CmdGameLoginReply = (function () {

        /**
         * Properties of a CmdGameLoginReply.
         * @memberof pb
         * @interface ICmdGameLoginReply
         * @property {pb.IErrorInfo|null} [result] CmdGameLoginReply result
         * @property {pb.IGameData|null} [data] CmdGameLoginReply data
         */

        /**
         * Constructs a new CmdGameLoginReply.
         * @memberof pb
         * @classdesc Represents a CmdGameLoginReply.
         * @implements ICmdGameLoginReply
         * @constructor
         * @param {pb.ICmdGameLoginReply=} [properties] Properties to set
         */
        function CmdGameLoginReply(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGameLoginReply result.
         * @member {pb.IErrorInfo|null|undefined} result
         * @memberof pb.CmdGameLoginReply
         * @instance
         */
        CmdGameLoginReply.prototype.result = null;

        /**
         * CmdGameLoginReply data.
         * @member {pb.IGameData|null|undefined} data
         * @memberof pb.CmdGameLoginReply
         * @instance
         */
        CmdGameLoginReply.prototype.data = null;

        /**
         * Creates a new CmdGameLoginReply instance using the specified properties.
         * @function create
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {pb.ICmdGameLoginReply=} [properties] Properties to set
         * @returns {pb.CmdGameLoginReply} CmdGameLoginReply instance
         */
        CmdGameLoginReply.create = function create(properties) {
            return new CmdGameLoginReply(properties);
        };

        /**
         * Encodes the specified CmdGameLoginReply message. Does not implicitly {@link pb.CmdGameLoginReply.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {pb.ICmdGameLoginReply} message CmdGameLoginReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameLoginReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pb.ErrorInfo.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                $root.pb.GameData.encode(message.data, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CmdGameLoginReply message, length delimited. Does not implicitly {@link pb.CmdGameLoginReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {pb.ICmdGameLoginReply} message CmdGameLoginReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameLoginReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGameLoginReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGameLoginReply} CmdGameLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameLoginReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGameLoginReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.result = $root.pb.ErrorInfo.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.data = $root.pb.GameData.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGameLoginReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGameLoginReply} CmdGameLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameLoginReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGameLoginReply message.
         * @function verify
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGameLoginReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pb.ErrorInfo.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.data != null && message.hasOwnProperty("data")) {
                var error = $root.pb.GameData.verify(message.data);
                if (error)
                    return "data." + error;
            }
            return null;
        };

        /**
         * Creates a CmdGameLoginReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGameLoginReply} CmdGameLoginReply
         */
        CmdGameLoginReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGameLoginReply)
                return object;
            var message = new $root.pb.CmdGameLoginReply();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pb.CmdGameLoginReply.result: object expected");
                message.result = $root.pb.ErrorInfo.fromObject(object.result);
            }
            if (object.data != null) {
                if (typeof object.data !== "object")
                    throw TypeError(".pb.CmdGameLoginReply.data: object expected");
                message.data = $root.pb.GameData.fromObject(object.data);
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdGameLoginReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGameLoginReply
         * @static
         * @param {pb.CmdGameLoginReply} message CmdGameLoginReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGameLoginReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.result = null;
                object.data = null;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pb.ErrorInfo.toObject(message.result, options);
            if (message.data != null && message.hasOwnProperty("data"))
                object.data = $root.pb.GameData.toObject(message.data, options);
            return object;
        };

        /**
         * Converts this CmdGameLoginReply to JSON.
         * @function toJSON
         * @memberof pb.CmdGameLoginReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGameLoginReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGameLoginReply;
    })();

    pb.CmdUploadIcon = (function () {

        /**
         * Properties of a CmdUploadIcon.
         * @memberof pb
         * @interface ICmdUploadIcon
         * @property {number|null} [uid] CmdUploadIcon uid
         * @property {Uint8Array|null} [icon] CmdUploadIcon icon
         */

        /**
         * Constructs a new CmdUploadIcon.
         * @memberof pb
         * @classdesc Represents a CmdUploadIcon.
         * @implements ICmdUploadIcon
         * @constructor
         * @param {pb.ICmdUploadIcon=} [properties] Properties to set
         */
        function CmdUploadIcon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdUploadIcon uid.
         * @member {number} uid
         * @memberof pb.CmdUploadIcon
         * @instance
         */
        CmdUploadIcon.prototype.uid = 0;

        /**
         * CmdUploadIcon icon.
         * @member {Uint8Array} icon
         * @memberof pb.CmdUploadIcon
         * @instance
         */
        CmdUploadIcon.prototype.icon = $util.newBuffer([]);

        /**
         * Creates a new CmdUploadIcon instance using the specified properties.
         * @function create
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {pb.ICmdUploadIcon=} [properties] Properties to set
         * @returns {pb.CmdUploadIcon} CmdUploadIcon instance
         */
        CmdUploadIcon.create = function create(properties) {
            return new CmdUploadIcon(properties);
        };

        /**
         * Encodes the specified CmdUploadIcon message. Does not implicitly {@link pb.CmdUploadIcon.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {pb.ICmdUploadIcon} message CmdUploadIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdUploadIcon.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                writer.uint32(/* id 2, wireType 2 =*/18).bytes(message.icon);
            return writer;
        };

        /**
         * Encodes the specified CmdUploadIcon message, length delimited. Does not implicitly {@link pb.CmdUploadIcon.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {pb.ICmdUploadIcon} message CmdUploadIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdUploadIcon.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdUploadIcon message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdUploadIcon} CmdUploadIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdUploadIcon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdUploadIcon();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.icon = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdUploadIcon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdUploadIcon} CmdUploadIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdUploadIcon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdUploadIcon message.
         * @function verify
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdUploadIcon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.icon != null && message.hasOwnProperty("icon"))
                if (!(message.icon && typeof message.icon.length === "number" || $util.isString(message.icon)))
                    return "icon: buffer expected";
            return null;
        };

        /**
         * Creates a CmdUploadIcon message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdUploadIcon} CmdUploadIcon
         */
        CmdUploadIcon.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdUploadIcon)
                return object;
            var message = new $root.pb.CmdUploadIcon();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.icon != null)
                if (typeof object.icon === "string")
                    $util.base64.decode(object.icon, message.icon = $util.newBuffer($util.base64.length(object.icon)), 0);
                else if (object.icon.length)
                    message.icon = object.icon;
            return message;
        };

        /**
         * Creates a plain object from a CmdUploadIcon message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdUploadIcon
         * @static
         * @param {pb.CmdUploadIcon} message CmdUploadIcon
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdUploadIcon.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                if (options.bytes === String)
                    object.icon = "";
                else {
                    object.icon = [];
                    if (options.bytes !== Array)
                        object.icon = $util.newBuffer(object.icon);
                }
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.icon != null && message.hasOwnProperty("icon"))
                object.icon = options.bytes === String ? $util.base64.encode(message.icon, 0, message.icon.length) : options.bytes === Array ? Array.prototype.slice.call(message.icon) : message.icon;
            return object;
        };

        /**
         * Converts this CmdUploadIcon to JSON.
         * @function toJSON
         * @memberof pb.CmdUploadIcon
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdUploadIcon.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdUploadIcon;
    })();

    pb.CmdEditNick = (function () {

        /**
         * Properties of a CmdEditNick.
         * @memberof pb
         * @interface ICmdEditNick
         * @property {number|null} [uid] CmdEditNick uid
         * @property {string|null} [nick] CmdEditNick nick
         */

        /**
         * Constructs a new CmdEditNick.
         * @memberof pb
         * @classdesc Represents a CmdEditNick.
         * @implements ICmdEditNick
         * @constructor
         * @param {pb.ICmdEditNick=} [properties] Properties to set
         */
        function CmdEditNick(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdEditNick uid.
         * @member {number} uid
         * @memberof pb.CmdEditNick
         * @instance
         */
        CmdEditNick.prototype.uid = 0;

        /**
         * CmdEditNick nick.
         * @member {string} nick
         * @memberof pb.CmdEditNick
         * @instance
         */
        CmdEditNick.prototype.nick = "";

        /**
         * Creates a new CmdEditNick instance using the specified properties.
         * @function create
         * @memberof pb.CmdEditNick
         * @static
         * @param {pb.ICmdEditNick=} [properties] Properties to set
         * @returns {pb.CmdEditNick} CmdEditNick instance
         */
        CmdEditNick.create = function create(properties) {
            return new CmdEditNick(properties);
        };

        /**
         * Encodes the specified CmdEditNick message. Does not implicitly {@link pb.CmdEditNick.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdEditNick
         * @static
         * @param {pb.ICmdEditNick} message CmdEditNick message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdEditNick.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.nick != null && Object.hasOwnProperty.call(message, "nick"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.nick);
            return writer;
        };

        /**
         * Encodes the specified CmdEditNick message, length delimited. Does not implicitly {@link pb.CmdEditNick.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdEditNick
         * @static
         * @param {pb.ICmdEditNick} message CmdEditNick message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdEditNick.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdEditNick message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdEditNick
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdEditNick} CmdEditNick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdEditNick.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdEditNick();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.nick = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdEditNick message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdEditNick
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdEditNick} CmdEditNick
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdEditNick.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdEditNick message.
         * @function verify
         * @memberof pb.CmdEditNick
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdEditNick.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.nick != null && message.hasOwnProperty("nick"))
                if (!$util.isString(message.nick))
                    return "nick: string expected";
            return null;
        };

        /**
         * Creates a CmdEditNick message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdEditNick
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdEditNick} CmdEditNick
         */
        CmdEditNick.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdEditNick)
                return object;
            var message = new $root.pb.CmdEditNick();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.nick != null)
                message.nick = String(object.nick);
            return message;
        };

        /**
         * Creates a plain object from a CmdEditNick message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdEditNick
         * @static
         * @param {pb.CmdEditNick} message CmdEditNick
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdEditNick.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.nick = "";
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.nick != null && message.hasOwnProperty("nick"))
                object.nick = message.nick;
            return object;
        };

        /**
         * Converts this CmdEditNick to JSON.
         * @function toJSON
         * @memberof pb.CmdEditNick
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdEditNick.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdEditNick;
    })();

    pb.CmdEditIcon = (function () {

        /**
         * Properties of a CmdEditIcon.
         * @memberof pb
         * @interface ICmdEditIcon
         * @property {number|null} [uid] CmdEditIcon uid
         * @property {string|null} [icon] CmdEditIcon icon
         */

        /**
         * Constructs a new CmdEditIcon.
         * @memberof pb
         * @classdesc Represents a CmdEditIcon.
         * @implements ICmdEditIcon
         * @constructor
         * @param {pb.ICmdEditIcon=} [properties] Properties to set
         */
        function CmdEditIcon(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdEditIcon uid.
         * @member {number} uid
         * @memberof pb.CmdEditIcon
         * @instance
         */
        CmdEditIcon.prototype.uid = 0;

        /**
         * CmdEditIcon icon.
         * @member {string} icon
         * @memberof pb.CmdEditIcon
         * @instance
         */
        CmdEditIcon.prototype.icon = "";

        /**
         * Creates a new CmdEditIcon instance using the specified properties.
         * @function create
         * @memberof pb.CmdEditIcon
         * @static
         * @param {pb.ICmdEditIcon=} [properties] Properties to set
         * @returns {pb.CmdEditIcon} CmdEditIcon instance
         */
        CmdEditIcon.create = function create(properties) {
            return new CmdEditIcon(properties);
        };

        /**
         * Encodes the specified CmdEditIcon message. Does not implicitly {@link pb.CmdEditIcon.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdEditIcon
         * @static
         * @param {pb.ICmdEditIcon} message CmdEditIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdEditIcon.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.icon);
            return writer;
        };

        /**
         * Encodes the specified CmdEditIcon message, length delimited. Does not implicitly {@link pb.CmdEditIcon.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdEditIcon
         * @static
         * @param {pb.ICmdEditIcon} message CmdEditIcon message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdEditIcon.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdEditIcon message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdEditIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdEditIcon} CmdEditIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdEditIcon.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdEditIcon();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.icon = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdEditIcon message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdEditIcon
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdEditIcon} CmdEditIcon
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdEditIcon.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdEditIcon message.
         * @function verify
         * @memberof pb.CmdEditIcon
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdEditIcon.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.icon != null && message.hasOwnProperty("icon"))
                if (!$util.isString(message.icon))
                    return "icon: string expected";
            return null;
        };

        /**
         * Creates a CmdEditIcon message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdEditIcon
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdEditIcon} CmdEditIcon
         */
        CmdEditIcon.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdEditIcon)
                return object;
            var message = new $root.pb.CmdEditIcon();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.icon != null)
                message.icon = String(object.icon);
            return message;
        };

        /**
         * Creates a plain object from a CmdEditIcon message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdEditIcon
         * @static
         * @param {pb.CmdEditIcon} message CmdEditIcon
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdEditIcon.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                object.icon = "";
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.icon != null && message.hasOwnProperty("icon"))
                object.icon = message.icon;
            return object;
        };

        /**
         * Converts this CmdEditIcon to JSON.
         * @function toJSON
         * @memberof pb.CmdEditIcon
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdEditIcon.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdEditIcon;
    })();

    pb.CmdGameStart = (function () {

        /**
         * Properties of a CmdGameStart.
         * @memberof pb
         * @interface ICmdGameStart
         * @property {pb.GameType|null} [game] CmdGameStart game
         */

        /**
         * Constructs a new CmdGameStart.
         * @memberof pb
         * @classdesc Represents a CmdGameStart.
         * @implements ICmdGameStart
         * @constructor
         * @param {pb.ICmdGameStart=} [properties] Properties to set
         */
        function CmdGameStart(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGameStart game.
         * @member {pb.GameType} game
         * @memberof pb.CmdGameStart
         * @instance
         */
        CmdGameStart.prototype.game = 0;

        /**
         * Creates a new CmdGameStart instance using the specified properties.
         * @function create
         * @memberof pb.CmdGameStart
         * @static
         * @param {pb.ICmdGameStart=} [properties] Properties to set
         * @returns {pb.CmdGameStart} CmdGameStart instance
         */
        CmdGameStart.create = function create(properties) {
            return new CmdGameStart(properties);
        };

        /**
         * Encodes the specified CmdGameStart message. Does not implicitly {@link pb.CmdGameStart.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGameStart
         * @static
         * @param {pb.ICmdGameStart} message CmdGameStart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameStart.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.game != null && Object.hasOwnProperty.call(message, "game"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.game);
            return writer;
        };

        /**
         * Encodes the specified CmdGameStart message, length delimited. Does not implicitly {@link pb.CmdGameStart.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGameStart
         * @static
         * @param {pb.ICmdGameStart} message CmdGameStart message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameStart.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGameStart message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGameStart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGameStart} CmdGameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameStart.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGameStart();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.game = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGameStart message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGameStart
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGameStart} CmdGameStart
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameStart.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGameStart message.
         * @function verify
         * @memberof pb.CmdGameStart
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGameStart.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.game != null && message.hasOwnProperty("game"))
                switch (message.game) {
                    default:
                        return "game: enum value expected";
                    case 0:
                    case 3:
                    case 4:
                    case 17:
                    case 11:
                    case 6:
                    case 1:
                    case 2:
                    case 16:
                    case 15:
                    case 10:
                    case 9:
                    case 7:
                    case 8:
                    case 30:
                        break;
                }
            return null;
        };

        /**
         * Creates a CmdGameStart message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGameStart
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGameStart} CmdGameStart
         */
        CmdGameStart.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGameStart)
                return object;
            var message = new $root.pb.CmdGameStart();
            switch (object.game) {
                case "GameType_NULL":
                case 0:
                    message.game = 0;
                    break;
                case "ShuangMang":
                case 3:
                    message.game = 3;
                    break;
                case "DingXiang":
                case 4:
                    message.game = 4;
                    break;
                case "ZhiBiao":
                case 17:
                    message.game = 17;
                    break;
                case "TiaoJianDan":
                case 11:
                    message.game = 11;
                    break;
                case "QiHuo":
                case 6:
                    message.game = 6;
                    break;
                case "JJ_PK":
                case 1:
                    message.game = 1;
                    break;
                case "JJ_DuoKong":
                case 2:
                    message.game = 2;
                    break;
                case "JJ_ChuangGuan":
                case 16:
                    message.game = 16;
                    break;
                case "JJ_QiHuo":
                case 15:
                    message.game = 15;
                    break;
                case "MoNiChaoGu":
                case 10:
                    message.game = 10;
                    break;
                case "ChaoGuDaSai":
                case 9:
                    message.game = 9;
                    break;
                case "GeGuJingChai":
                case 7:
                    message.game = 7;
                    break;
                case "DaPanJingChai":
                case 8:
                    message.game = 8;
                    break;
                case "MaxGameType":
                case 30:
                    message.game = 30;
                    break;
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdGameStart message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGameStart
         * @static
         * @param {pb.CmdGameStart} message CmdGameStart
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGameStart.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.game = options.enums === String ? "GameType_NULL" : 0;
            if (message.game != null && message.hasOwnProperty("game"))
                object.game = options.enums === String ? $root.pb.GameType[message.game] : message.game;
            return object;
        };

        /**
         * Converts this CmdGameStart to JSON.
         * @function toJSON
         * @memberof pb.CmdGameStart
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGameStart.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGameStart;
    })();

    pb.CmdGameOver = (function () {

        /**
         * Properties of a CmdGameOver.
         * @memberof pb
         * @interface ICmdGameOver
         * @property {pb.IGameResult|null} [result] CmdGameOver result
         * @property {pb.IGameOperations|null} [operations] CmdGameOver operations
         */

        /**
         * Constructs a new CmdGameOver.
         * @memberof pb
         * @classdesc Represents a CmdGameOver.
         * @implements ICmdGameOver
         * @constructor
         * @param {pb.ICmdGameOver=} [properties] Properties to set
         */
        function CmdGameOver(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGameOver result.
         * @member {pb.IGameResult|null|undefined} result
         * @memberof pb.CmdGameOver
         * @instance
         */
        CmdGameOver.prototype.result = null;

        /**
         * CmdGameOver operations.
         * @member {pb.IGameOperations|null|undefined} operations
         * @memberof pb.CmdGameOver
         * @instance
         */
        CmdGameOver.prototype.operations = null;

        /**
         * Creates a new CmdGameOver instance using the specified properties.
         * @function create
         * @memberof pb.CmdGameOver
         * @static
         * @param {pb.ICmdGameOver=} [properties] Properties to set
         * @returns {pb.CmdGameOver} CmdGameOver instance
         */
        CmdGameOver.create = function create(properties) {
            return new CmdGameOver(properties);
        };

        /**
         * Encodes the specified CmdGameOver message. Does not implicitly {@link pb.CmdGameOver.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGameOver
         * @static
         * @param {pb.ICmdGameOver} message CmdGameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameOver.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.result != null && Object.hasOwnProperty.call(message, "result"))
                $root.pb.GameResult.encode(message.result, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.operations != null && Object.hasOwnProperty.call(message, "operations"))
                $root.pb.GameOperations.encode(message.operations, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CmdGameOver message, length delimited. Does not implicitly {@link pb.CmdGameOver.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGameOver
         * @static
         * @param {pb.ICmdGameOver} message CmdGameOver message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGameOver.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGameOver message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGameOver} CmdGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameOver.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGameOver();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.result = $root.pb.GameResult.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.operations = $root.pb.GameOperations.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGameOver message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGameOver
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGameOver} CmdGameOver
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGameOver.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGameOver message.
         * @function verify
         * @memberof pb.CmdGameOver
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGameOver.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.result != null && message.hasOwnProperty("result")) {
                var error = $root.pb.GameResult.verify(message.result);
                if (error)
                    return "result." + error;
            }
            if (message.operations != null && message.hasOwnProperty("operations")) {
                var error = $root.pb.GameOperations.verify(message.operations);
                if (error)
                    return "operations." + error;
            }
            return null;
        };

        /**
         * Creates a CmdGameOver message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGameOver
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGameOver} CmdGameOver
         */
        CmdGameOver.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGameOver)
                return object;
            var message = new $root.pb.CmdGameOver();
            if (object.result != null) {
                if (typeof object.result !== "object")
                    throw TypeError(".pb.CmdGameOver.result: object expected");
                message.result = $root.pb.GameResult.fromObject(object.result);
            }
            if (object.operations != null) {
                if (typeof object.operations !== "object")
                    throw TypeError(".pb.CmdGameOver.operations: object expected");
                message.operations = $root.pb.GameOperations.fromObject(object.operations);
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdGameOver message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGameOver
         * @static
         * @param {pb.CmdGameOver} message CmdGameOver
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGameOver.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.result = null;
                object.operations = null;
            }
            if (message.result != null && message.hasOwnProperty("result"))
                object.result = $root.pb.GameResult.toObject(message.result, options);
            if (message.operations != null && message.hasOwnProperty("operations"))
                object.operations = $root.pb.GameOperations.toObject(message.operations, options);
            return object;
        };

        /**
         * Converts this CmdGameOver to JSON.
         * @function toJSON
         * @memberof pb.CmdGameOver
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGameOver.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGameOver;
    })();

    pb.CmdQueryGameResult = (function () {

        /**
         * Properties of a CmdQueryGameResult.
         * @memberof pb
         * @interface ICmdQueryGameResult
         * @property {pb.GameType|null} [gType] CmdQueryGameResult gType
         * @property {number|Long|null} [from] CmdQueryGameResult from
         * @property {number|Long|null} [to] CmdQueryGameResult to
         * @property {number|null} [pageSize] CmdQueryGameResult pageSize
         */

        /**
         * Constructs a new CmdQueryGameResult.
         * @memberof pb
         * @classdesc Represents a CmdQueryGameResult.
         * @implements ICmdQueryGameResult
         * @constructor
         * @param {pb.ICmdQueryGameResult=} [properties] Properties to set
         */
        function CmdQueryGameResult(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdQueryGameResult gType.
         * @member {pb.GameType} gType
         * @memberof pb.CmdQueryGameResult
         * @instance
         */
        CmdQueryGameResult.prototype.gType = 0;

        /**
         * CmdQueryGameResult from.
         * @member {number|Long} from
         * @memberof pb.CmdQueryGameResult
         * @instance
         */
        CmdQueryGameResult.prototype.from = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdQueryGameResult to.
         * @member {number|Long} to
         * @memberof pb.CmdQueryGameResult
         * @instance
         */
        CmdQueryGameResult.prototype.to = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdQueryGameResult pageSize.
         * @member {number} pageSize
         * @memberof pb.CmdQueryGameResult
         * @instance
         */
        CmdQueryGameResult.prototype.pageSize = 0;

        /**
         * Creates a new CmdQueryGameResult instance using the specified properties.
         * @function create
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {pb.ICmdQueryGameResult=} [properties] Properties to set
         * @returns {pb.CmdQueryGameResult} CmdQueryGameResult instance
         */
        CmdQueryGameResult.create = function create(properties) {
            return new CmdQueryGameResult(properties);
        };

        /**
         * Encodes the specified CmdQueryGameResult message. Does not implicitly {@link pb.CmdQueryGameResult.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {pb.ICmdQueryGameResult} message CmdQueryGameResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQueryGameResult.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.gType != null && Object.hasOwnProperty.call(message, "gType"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.gType);
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.from);
            if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.to);
            if (message.pageSize != null && Object.hasOwnProperty.call(message, "pageSize"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.pageSize);
            return writer;
        };

        /**
         * Encodes the specified CmdQueryGameResult message, length delimited. Does not implicitly {@link pb.CmdQueryGameResult.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {pb.ICmdQueryGameResult} message CmdQueryGameResult message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQueryGameResult.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdQueryGameResult message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdQueryGameResult} CmdQueryGameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQueryGameResult.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdQueryGameResult();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.gType = reader.int32();
                        break;
                    case 2:
                        message.from = reader.int64();
                        break;
                    case 3:
                        message.to = reader.int64();
                        break;
                    case 4:
                        message.pageSize = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdQueryGameResult message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdQueryGameResult} CmdQueryGameResult
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQueryGameResult.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdQueryGameResult message.
         * @function verify
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdQueryGameResult.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.gType != null && message.hasOwnProperty("gType"))
                switch (message.gType) {
                    default:
                        return "gType: enum value expected";
                    case 0:
                    case 3:
                    case 4:
                    case 17:
                    case 11:
                    case 6:
                    case 1:
                    case 2:
                    case 16:
                    case 15:
                    case 10:
                    case 9:
                    case 7:
                    case 8:
                    case 30:
                        break;
                }
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isInteger(message.from) && !(message.from && $util.isInteger(message.from.low) && $util.isInteger(message.from.high)))
                    return "from: integer|Long expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isInteger(message.to) && !(message.to && $util.isInteger(message.to.low) && $util.isInteger(message.to.high)))
                    return "to: integer|Long expected";
            if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                if (!$util.isInteger(message.pageSize))
                    return "pageSize: integer expected";
            return null;
        };

        /**
         * Creates a CmdQueryGameResult message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdQueryGameResult} CmdQueryGameResult
         */
        CmdQueryGameResult.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdQueryGameResult)
                return object;
            var message = new $root.pb.CmdQueryGameResult();
            switch (object.gType) {
                case "GameType_NULL":
                case 0:
                    message.gType = 0;
                    break;
                case "ShuangMang":
                case 3:
                    message.gType = 3;
                    break;
                case "DingXiang":
                case 4:
                    message.gType = 4;
                    break;
                case "ZhiBiao":
                case 17:
                    message.gType = 17;
                    break;
                case "TiaoJianDan":
                case 11:
                    message.gType = 11;
                    break;
                case "QiHuo":
                case 6:
                    message.gType = 6;
                    break;
                case "JJ_PK":
                case 1:
                    message.gType = 1;
                    break;
                case "JJ_DuoKong":
                case 2:
                    message.gType = 2;
                    break;
                case "JJ_ChuangGuan":
                case 16:
                    message.gType = 16;
                    break;
                case "JJ_QiHuo":
                case 15:
                    message.gType = 15;
                    break;
                case "MoNiChaoGu":
                case 10:
                    message.gType = 10;
                    break;
                case "ChaoGuDaSai":
                case 9:
                    message.gType = 9;
                    break;
                case "GeGuJingChai":
                case 7:
                    message.gType = 7;
                    break;
                case "DaPanJingChai":
                case 8:
                    message.gType = 8;
                    break;
                case "MaxGameType":
                case 30:
                    message.gType = 30;
                    break;
            }
            if (object.from != null)
                if ($util.Long)
                    (message.from = $util.Long.fromValue(object.from)).unsigned = false;
                else if (typeof object.from === "string")
                    message.from = parseInt(object.from, 10);
                else if (typeof object.from === "number")
                    message.from = object.from;
                else if (typeof object.from === "object")
                    message.from = new $util.LongBits(object.from.low >>> 0, object.from.high >>> 0).toNumber();
            if (object.to != null)
                if ($util.Long)
                    (message.to = $util.Long.fromValue(object.to)).unsigned = false;
                else if (typeof object.to === "string")
                    message.to = parseInt(object.to, 10);
                else if (typeof object.to === "number")
                    message.to = object.to;
                else if (typeof object.to === "object")
                    message.to = new $util.LongBits(object.to.low >>> 0, object.to.high >>> 0).toNumber();
            if (object.pageSize != null)
                message.pageSize = object.pageSize | 0;
            return message;
        };

        /**
         * Creates a plain object from a CmdQueryGameResult message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdQueryGameResult
         * @static
         * @param {pb.CmdQueryGameResult} message CmdQueryGameResult
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdQueryGameResult.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.gType = options.enums === String ? "GameType_NULL" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.from = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.to = options.longs === String ? "0" : 0;
                object.pageSize = 0;
            }
            if (message.gType != null && message.hasOwnProperty("gType"))
                object.gType = options.enums === String ? $root.pb.GameType[message.gType] : message.gType;
            if (message.from != null && message.hasOwnProperty("from"))
                if (typeof message.from === "number")
                    object.from = options.longs === String ? String(message.from) : message.from;
                else
                    object.from = options.longs === String ? $util.Long.prototype.toString.call(message.from) : options.longs === Number ? new $util.LongBits(message.from.low >>> 0, message.from.high >>> 0).toNumber() : message.from;
            if (message.to != null && message.hasOwnProperty("to"))
                if (typeof message.to === "number")
                    object.to = options.longs === String ? String(message.to) : message.to;
                else
                    object.to = options.longs === String ? $util.Long.prototype.toString.call(message.to) : options.longs === Number ? new $util.LongBits(message.to.low >>> 0, message.to.high >>> 0).toNumber() : message.to;
            if (message.pageSize != null && message.hasOwnProperty("pageSize"))
                object.pageSize = message.pageSize;
            return object;
        };

        /**
         * Converts this CmdQueryGameResult to JSON.
         * @function toJSON
         * @memberof pb.CmdQueryGameResult
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdQueryGameResult.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdQueryGameResult;
    })();

    pb.CmdQueryGameResultReply = (function () {

        /**
         * Properties of a CmdQueryGameResultReply.
         * @memberof pb
         * @interface ICmdQueryGameResultReply
         * @property {Array.<pb.IGameResult>|null} [results] CmdQueryGameResultReply results
         */

        /**
         * Constructs a new CmdQueryGameResultReply.
         * @memberof pb
         * @classdesc Represents a CmdQueryGameResultReply.
         * @implements ICmdQueryGameResultReply
         * @constructor
         * @param {pb.ICmdQueryGameResultReply=} [properties] Properties to set
         */
        function CmdQueryGameResultReply(properties) {
            this.results = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdQueryGameResultReply results.
         * @member {Array.<pb.IGameResult>} results
         * @memberof pb.CmdQueryGameResultReply
         * @instance
         */
        CmdQueryGameResultReply.prototype.results = $util.emptyArray;

        /**
         * Creates a new CmdQueryGameResultReply instance using the specified properties.
         * @function create
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {pb.ICmdQueryGameResultReply=} [properties] Properties to set
         * @returns {pb.CmdQueryGameResultReply} CmdQueryGameResultReply instance
         */
        CmdQueryGameResultReply.create = function create(properties) {
            return new CmdQueryGameResultReply(properties);
        };

        /**
         * Encodes the specified CmdQueryGameResultReply message. Does not implicitly {@link pb.CmdQueryGameResultReply.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {pb.ICmdQueryGameResultReply} message CmdQueryGameResultReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQueryGameResultReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.results != null && message.results.length)
                for (var i = 0; i < message.results.length; ++i)
                    $root.pb.GameResult.encode(message.results[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CmdQueryGameResultReply message, length delimited. Does not implicitly {@link pb.CmdQueryGameResultReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {pb.ICmdQueryGameResultReply} message CmdQueryGameResultReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQueryGameResultReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdQueryGameResultReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdQueryGameResultReply} CmdQueryGameResultReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQueryGameResultReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdQueryGameResultReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.results && message.results.length))
                            message.results = [];
                        message.results.push($root.pb.GameResult.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdQueryGameResultReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdQueryGameResultReply} CmdQueryGameResultReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQueryGameResultReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdQueryGameResultReply message.
         * @function verify
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdQueryGameResultReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.results != null && message.hasOwnProperty("results")) {
                if (!Array.isArray(message.results))
                    return "results: array expected";
                for (var i = 0; i < message.results.length; ++i) {
                    var error = $root.pb.GameResult.verify(message.results[i]);
                    if (error)
                        return "results." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CmdQueryGameResultReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdQueryGameResultReply} CmdQueryGameResultReply
         */
        CmdQueryGameResultReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdQueryGameResultReply)
                return object;
            var message = new $root.pb.CmdQueryGameResultReply();
            if (object.results) {
                if (!Array.isArray(object.results))
                    throw TypeError(".pb.CmdQueryGameResultReply.results: array expected");
                message.results = [];
                for (var i = 0; i < object.results.length; ++i) {
                    if (typeof object.results[i] !== "object")
                        throw TypeError(".pb.CmdQueryGameResultReply.results: object expected");
                    message.results[i] = $root.pb.GameResult.fromObject(object.results[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdQueryGameResultReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdQueryGameResultReply
         * @static
         * @param {pb.CmdQueryGameResultReply} message CmdQueryGameResultReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdQueryGameResultReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.results = [];
            if (message.results && message.results.length) {
                object.results = [];
                for (var j = 0; j < message.results.length; ++j)
                    object.results[j] = $root.pb.GameResult.toObject(message.results[j], options);
            }
            return object;
        };

        /**
         * Converts this CmdQueryGameResultReply to JSON.
         * @function toJSON
         * @memberof pb.CmdQueryGameResultReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdQueryGameResultReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdQueryGameResultReply;
    })();

    pb.CmdGetGameOperations = (function () {

        /**
         * Properties of a CmdGetGameOperations.
         * @memberof pb
         * @interface ICmdGetGameOperations
         * @property {number|null} [uid] CmdGetGameOperations uid
         * @property {number|Long|null} [ts] CmdGetGameOperations ts
         */

        /**
         * Constructs a new CmdGetGameOperations.
         * @memberof pb
         * @classdesc Represents a CmdGetGameOperations.
         * @implements ICmdGetGameOperations
         * @constructor
         * @param {pb.ICmdGetGameOperations=} [properties] Properties to set
         */
        function CmdGetGameOperations(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGetGameOperations uid.
         * @member {number} uid
         * @memberof pb.CmdGetGameOperations
         * @instance
         */
        CmdGetGameOperations.prototype.uid = 0;

        /**
         * CmdGetGameOperations ts.
         * @member {number|Long} ts
         * @memberof pb.CmdGetGameOperations
         * @instance
         */
        CmdGetGameOperations.prototype.ts = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * Creates a new CmdGetGameOperations instance using the specified properties.
         * @function create
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {pb.ICmdGetGameOperations=} [properties] Properties to set
         * @returns {pb.CmdGetGameOperations} CmdGetGameOperations instance
         */
        CmdGetGameOperations.create = function create(properties) {
            return new CmdGetGameOperations(properties);
        };

        /**
         * Encodes the specified CmdGetGameOperations message. Does not implicitly {@link pb.CmdGetGameOperations.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {pb.ICmdGetGameOperations} message CmdGetGameOperations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetGameOperations.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.uid);
            if (message.ts != null && Object.hasOwnProperty.call(message, "ts"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.ts);
            return writer;
        };

        /**
         * Encodes the specified CmdGetGameOperations message, length delimited. Does not implicitly {@link pb.CmdGetGameOperations.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {pb.ICmdGetGameOperations} message CmdGetGameOperations message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetGameOperations.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGetGameOperations message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGetGameOperations} CmdGetGameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetGameOperations.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGetGameOperations();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.uid = reader.int32();
                        break;
                    case 2:
                        message.ts = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGetGameOperations message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGetGameOperations} CmdGetGameOperations
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetGameOperations.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGetGameOperations message.
         * @function verify
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGetGameOperations.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (!$util.isInteger(message.ts) && !(message.ts && $util.isInteger(message.ts.low) && $util.isInteger(message.ts.high)))
                    return "ts: integer|Long expected";
            return null;
        };

        /**
         * Creates a CmdGetGameOperations message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGetGameOperations} CmdGetGameOperations
         */
        CmdGetGameOperations.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGetGameOperations)
                return object;
            var message = new $root.pb.CmdGetGameOperations();
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.ts != null)
                if ($util.Long)
                    (message.ts = $util.Long.fromValue(object.ts)).unsigned = false;
                else if (typeof object.ts === "string")
                    message.ts = parseInt(object.ts, 10);
                else if (typeof object.ts === "number")
                    message.ts = object.ts;
                else if (typeof object.ts === "object")
                    message.ts = new $util.LongBits(object.ts.low >>> 0, object.ts.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CmdGetGameOperations message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGetGameOperations
         * @static
         * @param {pb.CmdGetGameOperations} message CmdGetGameOperations
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGetGameOperations.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.uid = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.ts = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.ts = options.longs === String ? "0" : 0;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.ts != null && message.hasOwnProperty("ts"))
                if (typeof message.ts === "number")
                    object.ts = options.longs === String ? String(message.ts) : message.ts;
                else
                    object.ts = options.longs === String ? $util.Long.prototype.toString.call(message.ts) : options.longs === Number ? new $util.LongBits(message.ts.low >>> 0, message.ts.high >>> 0).toNumber() : message.ts;
            return object;
        };

        /**
         * Converts this CmdGetGameOperations to JSON.
         * @function toJSON
         * @memberof pb.CmdGetGameOperations
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGetGameOperations.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGetGameOperations;
    })();

    pb.CmdGetGameOperationsReply = (function () {

        /**
         * Properties of a CmdGetGameOperationsReply.
         * @memberof pb
         * @interface ICmdGetGameOperationsReply
         * @property {pb.IErrorInfo|null} [err] CmdGetGameOperationsReply err
         * @property {pb.IGameOperations|null} [operations] CmdGetGameOperationsReply operations
         */

        /**
         * Constructs a new CmdGetGameOperationsReply.
         * @memberof pb
         * @classdesc Represents a CmdGetGameOperationsReply.
         * @implements ICmdGetGameOperationsReply
         * @constructor
         * @param {pb.ICmdGetGameOperationsReply=} [properties] Properties to set
         */
        function CmdGetGameOperationsReply(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGetGameOperationsReply err.
         * @member {pb.IErrorInfo|null|undefined} err
         * @memberof pb.CmdGetGameOperationsReply
         * @instance
         */
        CmdGetGameOperationsReply.prototype.err = null;

        /**
         * CmdGetGameOperationsReply operations.
         * @member {pb.IGameOperations|null|undefined} operations
         * @memberof pb.CmdGetGameOperationsReply
         * @instance
         */
        CmdGetGameOperationsReply.prototype.operations = null;

        /**
         * Creates a new CmdGetGameOperationsReply instance using the specified properties.
         * @function create
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {pb.ICmdGetGameOperationsReply=} [properties] Properties to set
         * @returns {pb.CmdGetGameOperationsReply} CmdGetGameOperationsReply instance
         */
        CmdGetGameOperationsReply.create = function create(properties) {
            return new CmdGetGameOperationsReply(properties);
        };

        /**
         * Encodes the specified CmdGetGameOperationsReply message. Does not implicitly {@link pb.CmdGetGameOperationsReply.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {pb.ICmdGetGameOperationsReply} message CmdGetGameOperationsReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetGameOperationsReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                $root.pb.ErrorInfo.encode(message.err, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.operations != null && Object.hasOwnProperty.call(message, "operations"))
                $root.pb.GameOperations.encode(message.operations, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CmdGetGameOperationsReply message, length delimited. Does not implicitly {@link pb.CmdGetGameOperationsReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {pb.ICmdGetGameOperationsReply} message CmdGetGameOperationsReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetGameOperationsReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGetGameOperationsReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGetGameOperationsReply} CmdGetGameOperationsReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetGameOperationsReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGetGameOperationsReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.err = $root.pb.ErrorInfo.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.operations = $root.pb.GameOperations.decode(reader, reader.uint32());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGetGameOperationsReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGetGameOperationsReply} CmdGetGameOperationsReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetGameOperationsReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGetGameOperationsReply message.
         * @function verify
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGetGameOperationsReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err")) {
                var error = $root.pb.ErrorInfo.verify(message.err);
                if (error)
                    return "err." + error;
            }
            if (message.operations != null && message.hasOwnProperty("operations")) {
                var error = $root.pb.GameOperations.verify(message.operations);
                if (error)
                    return "operations." + error;
            }
            return null;
        };

        /**
         * Creates a CmdGetGameOperationsReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGetGameOperationsReply} CmdGetGameOperationsReply
         */
        CmdGetGameOperationsReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGetGameOperationsReply)
                return object;
            var message = new $root.pb.CmdGetGameOperationsReply();
            if (object.err != null) {
                if (typeof object.err !== "object")
                    throw TypeError(".pb.CmdGetGameOperationsReply.err: object expected");
                message.err = $root.pb.ErrorInfo.fromObject(object.err);
            }
            if (object.operations != null) {
                if (typeof object.operations !== "object")
                    throw TypeError(".pb.CmdGetGameOperationsReply.operations: object expected");
                message.operations = $root.pb.GameOperations.fromObject(object.operations);
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdGetGameOperationsReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGetGameOperationsReply
         * @static
         * @param {pb.CmdGetGameOperationsReply} message CmdGetGameOperationsReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGetGameOperationsReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = null;
                object.operations = null;
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = $root.pb.ErrorInfo.toObject(message.err, options);
            if (message.operations != null && message.hasOwnProperty("operations"))
                object.operations = $root.pb.GameOperations.toObject(message.operations, options);
            return object;
        };

        /**
         * Converts this CmdGetGameOperationsReply to JSON.
         * @function toJSON
         * @memberof pb.CmdGetGameOperationsReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGetGameOperationsReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGetGameOperationsReply;
    })();

    pb.CmdGetSmxlReportReply = (function () {

        /**
         * Properties of a CmdGetSmxlReportReply.
         * @memberof pb
         * @interface ICmdGetSmxlReportReply
         * @property {number|Long|null} [capitalInit] CmdGetSmxlReportReply capitalInit
         * @property {number|Long|null} [capitalFinal] CmdGetSmxlReportReply capitalFinal
         * @property {number|null} [profitRate] CmdGetSmxlReportReply profitRate
         * @property {number|null} [winCount] CmdGetSmxlReportReply winCount
         * @property {number|null} [winCode] CmdGetSmxlReportReply winCode
         * @property {number|null} [winRate] CmdGetSmxlReportReply winRate
         * @property {number|null} [loseCount] CmdGetSmxlReportReply loseCount
         * @property {number|null} [loseCode] CmdGetSmxlReportReply loseCode
         * @property {number|null} [loseRate] CmdGetSmxlReportReply loseRate
         * @property {number|null} [count] CmdGetSmxlReportReply count
         * @property {number|null} [rankCaptial] CmdGetSmxlReportReply rankCaptial
         * @property {number|null} [rankRate] CmdGetSmxlReportReply rankRate
         */

        /**
         * Constructs a new CmdGetSmxlReportReply.
         * @memberof pb
         * @classdesc Represents a CmdGetSmxlReportReply.
         * @implements ICmdGetSmxlReportReply
         * @constructor
         * @param {pb.ICmdGetSmxlReportReply=} [properties] Properties to set
         */
        function CmdGetSmxlReportReply(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGetSmxlReportReply capitalInit.
         * @member {number|Long} capitalInit
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.capitalInit = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdGetSmxlReportReply capitalFinal.
         * @member {number|Long} capitalFinal
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.capitalFinal = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdGetSmxlReportReply profitRate.
         * @member {number} profitRate
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.profitRate = 0;

        /**
         * CmdGetSmxlReportReply winCount.
         * @member {number} winCount
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.winCount = 0;

        /**
         * CmdGetSmxlReportReply winCode.
         * @member {number} winCode
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.winCode = 0;

        /**
         * CmdGetSmxlReportReply winRate.
         * @member {number} winRate
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.winRate = 0;

        /**
         * CmdGetSmxlReportReply loseCount.
         * @member {number} loseCount
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.loseCount = 0;

        /**
         * CmdGetSmxlReportReply loseCode.
         * @member {number} loseCode
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.loseCode = 0;

        /**
         * CmdGetSmxlReportReply loseRate.
         * @member {number} loseRate
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.loseRate = 0;

        /**
         * CmdGetSmxlReportReply count.
         * @member {number} count
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.count = 0;

        /**
         * CmdGetSmxlReportReply rankCaptial.
         * @member {number} rankCaptial
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.rankCaptial = 0;

        /**
         * CmdGetSmxlReportReply rankRate.
         * @member {number} rankRate
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         */
        CmdGetSmxlReportReply.prototype.rankRate = 0;

        /**
         * Creates a new CmdGetSmxlReportReply instance using the specified properties.
         * @function create
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {pb.ICmdGetSmxlReportReply=} [properties] Properties to set
         * @returns {pb.CmdGetSmxlReportReply} CmdGetSmxlReportReply instance
         */
        CmdGetSmxlReportReply.create = function create(properties) {
            return new CmdGetSmxlReportReply(properties);
        };

        /**
         * Encodes the specified CmdGetSmxlReportReply message. Does not implicitly {@link pb.CmdGetSmxlReportReply.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {pb.ICmdGetSmxlReportReply} message CmdGetSmxlReportReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetSmxlReportReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.capitalInit != null && Object.hasOwnProperty.call(message, "capitalInit"))
                writer.uint32(/* id 1, wireType 0 =*/8).int64(message.capitalInit);
            if (message.capitalFinal != null && Object.hasOwnProperty.call(message, "capitalFinal"))
                writer.uint32(/* id 2, wireType 0 =*/16).int64(message.capitalFinal);
            if (message.profitRate != null && Object.hasOwnProperty.call(message, "profitRate"))
                writer.uint32(/* id 3, wireType 5 =*/29).float(message.profitRate);
            if (message.winCount != null && Object.hasOwnProperty.call(message, "winCount"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.winCount);
            if (message.winCode != null && Object.hasOwnProperty.call(message, "winCode"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.winCode);
            if (message.winRate != null && Object.hasOwnProperty.call(message, "winRate"))
                writer.uint32(/* id 6, wireType 5 =*/53).float(message.winRate);
            if (message.loseCount != null && Object.hasOwnProperty.call(message, "loseCount"))
                writer.uint32(/* id 7, wireType 0 =*/56).int32(message.loseCount);
            if (message.loseCode != null && Object.hasOwnProperty.call(message, "loseCode"))
                writer.uint32(/* id 8, wireType 0 =*/64).int32(message.loseCode);
            if (message.loseRate != null && Object.hasOwnProperty.call(message, "loseRate"))
                writer.uint32(/* id 9, wireType 5 =*/77).float(message.loseRate);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 10, wireType 0 =*/80).int32(message.count);
            if (message.rankCaptial != null && Object.hasOwnProperty.call(message, "rankCaptial"))
                writer.uint32(/* id 11, wireType 5 =*/93).float(message.rankCaptial);
            if (message.rankRate != null && Object.hasOwnProperty.call(message, "rankRate"))
                writer.uint32(/* id 12, wireType 5 =*/101).float(message.rankRate);
            return writer;
        };

        /**
         * Encodes the specified CmdGetSmxlReportReply message, length delimited. Does not implicitly {@link pb.CmdGetSmxlReportReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {pb.ICmdGetSmxlReportReply} message CmdGetSmxlReportReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetSmxlReportReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGetSmxlReportReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGetSmxlReportReply} CmdGetSmxlReportReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetSmxlReportReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGetSmxlReportReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.capitalInit = reader.int64();
                        break;
                    case 2:
                        message.capitalFinal = reader.int64();
                        break;
                    case 3:
                        message.profitRate = reader.float();
                        break;
                    case 4:
                        message.winCount = reader.int32();
                        break;
                    case 5:
                        message.winCode = reader.int32();
                        break;
                    case 6:
                        message.winRate = reader.float();
                        break;
                    case 7:
                        message.loseCount = reader.int32();
                        break;
                    case 8:
                        message.loseCode = reader.int32();
                        break;
                    case 9:
                        message.loseRate = reader.float();
                        break;
                    case 10:
                        message.count = reader.int32();
                        break;
                    case 11:
                        message.rankCaptial = reader.float();
                        break;
                    case 12:
                        message.rankRate = reader.float();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGetSmxlReportReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGetSmxlReportReply} CmdGetSmxlReportReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetSmxlReportReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGetSmxlReportReply message.
         * @function verify
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGetSmxlReportReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.capitalInit != null && message.hasOwnProperty("capitalInit"))
                if (!$util.isInteger(message.capitalInit) && !(message.capitalInit && $util.isInteger(message.capitalInit.low) && $util.isInteger(message.capitalInit.high)))
                    return "capitalInit: integer|Long expected";
            if (message.capitalFinal != null && message.hasOwnProperty("capitalFinal"))
                if (!$util.isInteger(message.capitalFinal) && !(message.capitalFinal && $util.isInteger(message.capitalFinal.low) && $util.isInteger(message.capitalFinal.high)))
                    return "capitalFinal: integer|Long expected";
            if (message.profitRate != null && message.hasOwnProperty("profitRate"))
                if (typeof message.profitRate !== "number")
                    return "profitRate: number expected";
            if (message.winCount != null && message.hasOwnProperty("winCount"))
                if (!$util.isInteger(message.winCount))
                    return "winCount: integer expected";
            if (message.winCode != null && message.hasOwnProperty("winCode"))
                if (!$util.isInteger(message.winCode))
                    return "winCode: integer expected";
            if (message.winRate != null && message.hasOwnProperty("winRate"))
                if (typeof message.winRate !== "number")
                    return "winRate: number expected";
            if (message.loseCount != null && message.hasOwnProperty("loseCount"))
                if (!$util.isInteger(message.loseCount))
                    return "loseCount: integer expected";
            if (message.loseCode != null && message.hasOwnProperty("loseCode"))
                if (!$util.isInteger(message.loseCode))
                    return "loseCode: integer expected";
            if (message.loseRate != null && message.hasOwnProperty("loseRate"))
                if (typeof message.loseRate !== "number")
                    return "loseRate: number expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count))
                    return "count: integer expected";
            if (message.rankCaptial != null && message.hasOwnProperty("rankCaptial"))
                if (typeof message.rankCaptial !== "number")
                    return "rankCaptial: number expected";
            if (message.rankRate != null && message.hasOwnProperty("rankRate"))
                if (typeof message.rankRate !== "number")
                    return "rankRate: number expected";
            return null;
        };

        /**
         * Creates a CmdGetSmxlReportReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGetSmxlReportReply} CmdGetSmxlReportReply
         */
        CmdGetSmxlReportReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGetSmxlReportReply)
                return object;
            var message = new $root.pb.CmdGetSmxlReportReply();
            if (object.capitalInit != null)
                if ($util.Long)
                    (message.capitalInit = $util.Long.fromValue(object.capitalInit)).unsigned = false;
                else if (typeof object.capitalInit === "string")
                    message.capitalInit = parseInt(object.capitalInit, 10);
                else if (typeof object.capitalInit === "number")
                    message.capitalInit = object.capitalInit;
                else if (typeof object.capitalInit === "object")
                    message.capitalInit = new $util.LongBits(object.capitalInit.low >>> 0, object.capitalInit.high >>> 0).toNumber();
            if (object.capitalFinal != null)
                if ($util.Long)
                    (message.capitalFinal = $util.Long.fromValue(object.capitalFinal)).unsigned = false;
                else if (typeof object.capitalFinal === "string")
                    message.capitalFinal = parseInt(object.capitalFinal, 10);
                else if (typeof object.capitalFinal === "number")
                    message.capitalFinal = object.capitalFinal;
                else if (typeof object.capitalFinal === "object")
                    message.capitalFinal = new $util.LongBits(object.capitalFinal.low >>> 0, object.capitalFinal.high >>> 0).toNumber();
            if (object.profitRate != null)
                message.profitRate = Number(object.profitRate);
            if (object.winCount != null)
                message.winCount = object.winCount | 0;
            if (object.winCode != null)
                message.winCode = object.winCode | 0;
            if (object.winRate != null)
                message.winRate = Number(object.winRate);
            if (object.loseCount != null)
                message.loseCount = object.loseCount | 0;
            if (object.loseCode != null)
                message.loseCode = object.loseCode | 0;
            if (object.loseRate != null)
                message.loseRate = Number(object.loseRate);
            if (object.count != null)
                message.count = object.count | 0;
            if (object.rankCaptial != null)
                message.rankCaptial = Number(object.rankCaptial);
            if (object.rankRate != null)
                message.rankRate = Number(object.rankRate);
            return message;
        };

        /**
         * Creates a plain object from a CmdGetSmxlReportReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGetSmxlReportReply
         * @static
         * @param {pb.CmdGetSmxlReportReply} message CmdGetSmxlReportReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGetSmxlReportReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.capitalInit = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.capitalInit = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.capitalFinal = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.capitalFinal = options.longs === String ? "0" : 0;
                object.profitRate = 0;
                object.winCount = 0;
                object.winCode = 0;
                object.winRate = 0;
                object.loseCount = 0;
                object.loseCode = 0;
                object.loseRate = 0;
                object.count = 0;
                object.rankCaptial = 0;
                object.rankRate = 0;
            }
            if (message.capitalInit != null && message.hasOwnProperty("capitalInit"))
                if (typeof message.capitalInit === "number")
                    object.capitalInit = options.longs === String ? String(message.capitalInit) : message.capitalInit;
                else
                    object.capitalInit = options.longs === String ? $util.Long.prototype.toString.call(message.capitalInit) : options.longs === Number ? new $util.LongBits(message.capitalInit.low >>> 0, message.capitalInit.high >>> 0).toNumber() : message.capitalInit;
            if (message.capitalFinal != null && message.hasOwnProperty("capitalFinal"))
                if (typeof message.capitalFinal === "number")
                    object.capitalFinal = options.longs === String ? String(message.capitalFinal) : message.capitalFinal;
                else
                    object.capitalFinal = options.longs === String ? $util.Long.prototype.toString.call(message.capitalFinal) : options.longs === Number ? new $util.LongBits(message.capitalFinal.low >>> 0, message.capitalFinal.high >>> 0).toNumber() : message.capitalFinal;
            if (message.profitRate != null && message.hasOwnProperty("profitRate"))
                object.profitRate = options.json && !isFinite(message.profitRate) ? String(message.profitRate) : message.profitRate;
            if (message.winCount != null && message.hasOwnProperty("winCount"))
                object.winCount = message.winCount;
            if (message.winCode != null && message.hasOwnProperty("winCode"))
                object.winCode = message.winCode;
            if (message.winRate != null && message.hasOwnProperty("winRate"))
                object.winRate = options.json && !isFinite(message.winRate) ? String(message.winRate) : message.winRate;
            if (message.loseCount != null && message.hasOwnProperty("loseCount"))
                object.loseCount = message.loseCount;
            if (message.loseCode != null && message.hasOwnProperty("loseCode"))
                object.loseCode = message.loseCode;
            if (message.loseRate != null && message.hasOwnProperty("loseRate"))
                object.loseRate = options.json && !isFinite(message.loseRate) ? String(message.loseRate) : message.loseRate;
            if (message.count != null && message.hasOwnProperty("count"))
                object.count = message.count;
            if (message.rankCaptial != null && message.hasOwnProperty("rankCaptial"))
                object.rankCaptial = options.json && !isFinite(message.rankCaptial) ? String(message.rankCaptial) : message.rankCaptial;
            if (message.rankRate != null && message.hasOwnProperty("rankRate"))
                object.rankRate = options.json && !isFinite(message.rankRate) ? String(message.rankRate) : message.rankRate;
            return object;
        };

        /**
         * Converts this CmdGetSmxlReportReply to JSON.
         * @function toJSON
         * @memberof pb.CmdGetSmxlReportReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGetSmxlReportReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGetSmxlReportReply;
    })();

    /**
     * KType enum.
     * @name pb.KType
     * @enum {number}
     * @property {number} KType_NULL=0 KType_NULL value
     * @property {number} Real=1 Real value
     * @property {number} Min=2 Min value
     * @property {number} MinToday=3 MinToday value
     * @property {number} Min5=4 Min5 value
     * @property {number} Min15=5 Min15 value
     * @property {number} Min30=6 Min30 value
     * @property {number} Min60=7 Min60 value
     * @property {number} Day=10 Day value
     * @property {number} Day7=11 Day7 value
     */
    pb.KType = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "KType_NULL"] = 0;
        values[valuesById[1] = "Real"] = 1;
        values[valuesById[2] = "Min"] = 2;
        values[valuesById[3] = "MinToday"] = 3;
        values[valuesById[4] = "Min5"] = 4;
        values[valuesById[5] = "Min15"] = 5;
        values[valuesById[6] = "Min30"] = 6;
        values[valuesById[7] = "Min60"] = 7;
        values[valuesById[10] = "Day"] = 10;
        values[valuesById[11] = "Day7"] = 11;
        return values;
    })();

    /**
     * KStyle enum.
     * @name pb.KStyle
     * @enum {number}
     * @property {number} Random=0 Random value
     * @property {number} Wave=1 Wave value
     * @property {number} Up=2 Up value
     * @property {number} Down=3 Down value
     */
    pb.KStyle = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Random"] = 0;
        values[valuesById[1] = "Wave"] = 1;
        values[valuesById[2] = "Up"] = 2;
        values[valuesById[3] = "Down"] = 3;
        return values;
    })();

    pb.CmdQuoteQuery = (function () {

        /**
         * Properties of a CmdQuoteQuery.
         * @memberof pb
         * @interface ICmdQuoteQuery
         * @property {pb.KType|null} [ktype] CmdQuoteQuery ktype
         * @property {number|null} [code] CmdQuoteQuery code
         * @property {number|Long|null} [from] CmdQuoteQuery from
         * @property {number|null} [total] CmdQuoteQuery total
         * @property {number|Long|null} [to] CmdQuoteQuery to
         * @property {pb.KStyle|null} [kstyle] CmdQuoteQuery kstyle
         */

        /**
         * Constructs a new CmdQuoteQuery.
         * @memberof pb
         * @classdesc Represents a CmdQuoteQuery.
         * @implements ICmdQuoteQuery
         * @constructor
         * @param {pb.ICmdQuoteQuery=} [properties] Properties to set
         */
        function CmdQuoteQuery(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdQuoteQuery ktype.
         * @member {pb.KType} ktype
         * @memberof pb.CmdQuoteQuery
         * @instance
         */
        CmdQuoteQuery.prototype.ktype = 0;

        /**
         * CmdQuoteQuery code.
         * @member {number} code
         * @memberof pb.CmdQuoteQuery
         * @instance
         */
        CmdQuoteQuery.prototype.code = 0;

        /**
         * CmdQuoteQuery from.
         * @member {number|Long} from
         * @memberof pb.CmdQuoteQuery
         * @instance
         */
        CmdQuoteQuery.prototype.from = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdQuoteQuery total.
         * @member {number} total
         * @memberof pb.CmdQuoteQuery
         * @instance
         */
        CmdQuoteQuery.prototype.total = 0;

        /**
         * CmdQuoteQuery to.
         * @member {number|Long} to
         * @memberof pb.CmdQuoteQuery
         * @instance
         */
        CmdQuoteQuery.prototype.to = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdQuoteQuery kstyle.
         * @member {pb.KStyle} kstyle
         * @memberof pb.CmdQuoteQuery
         * @instance
         */
        CmdQuoteQuery.prototype.kstyle = 0;

        /**
         * Creates a new CmdQuoteQuery instance using the specified properties.
         * @function create
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {pb.ICmdQuoteQuery=} [properties] Properties to set
         * @returns {pb.CmdQuoteQuery} CmdQuoteQuery instance
         */
        CmdQuoteQuery.create = function create(properties) {
            return new CmdQuoteQuery(properties);
        };

        /**
         * Encodes the specified CmdQuoteQuery message. Does not implicitly {@link pb.CmdQuoteQuery.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {pb.ICmdQuoteQuery} message CmdQuoteQuery message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQuoteQuery.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ktype != null && Object.hasOwnProperty.call(message, "ktype"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ktype);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.code);
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.from);
            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.total);
            if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.to);
            if (message.kstyle != null && Object.hasOwnProperty.call(message, "kstyle"))
                writer.uint32(/* id 6, wireType 0 =*/48).int32(message.kstyle);
            return writer;
        };

        /**
         * Encodes the specified CmdQuoteQuery message, length delimited. Does not implicitly {@link pb.CmdQuoteQuery.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {pb.ICmdQuoteQuery} message CmdQuoteQuery message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQuoteQuery.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdQuoteQuery message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdQuoteQuery} CmdQuoteQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQuoteQuery.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdQuoteQuery();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.ktype = reader.int32();
                        break;
                    case 2:
                        message.code = reader.uint32();
                        break;
                    case 3:
                        message.from = reader.int64();
                        break;
                    case 4:
                        message.total = reader.int32();
                        break;
                    case 5:
                        message.to = reader.int64();
                        break;
                    case 6:
                        message.kstyle = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdQuoteQuery message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdQuoteQuery} CmdQuoteQuery
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQuoteQuery.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdQuoteQuery message.
         * @function verify
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdQuoteQuery.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                switch (message.ktype) {
                    default:
                        return "ktype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 10:
                    case 11:
                        break;
                }
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isInteger(message.from) && !(message.from && $util.isInteger(message.from.low) && $util.isInteger(message.from.high)))
                    return "from: integer|Long expected";
            if (message.total != null && message.hasOwnProperty("total"))
                if (!$util.isInteger(message.total))
                    return "total: integer expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isInteger(message.to) && !(message.to && $util.isInteger(message.to.low) && $util.isInteger(message.to.high)))
                    return "to: integer|Long expected";
            if (message.kstyle != null && message.hasOwnProperty("kstyle"))
                switch (message.kstyle) {
                    default:
                        return "kstyle: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                        break;
                }
            return null;
        };

        /**
         * Creates a CmdQuoteQuery message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdQuoteQuery} CmdQuoteQuery
         */
        CmdQuoteQuery.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdQuoteQuery)
                return object;
            var message = new $root.pb.CmdQuoteQuery();
            switch (object.ktype) {
                case "KType_NULL":
                case 0:
                    message.ktype = 0;
                    break;
                case "Real":
                case 1:
                    message.ktype = 1;
                    break;
                case "Min":
                case 2:
                    message.ktype = 2;
                    break;
                case "MinToday":
                case 3:
                    message.ktype = 3;
                    break;
                case "Min5":
                case 4:
                    message.ktype = 4;
                    break;
                case "Min15":
                case 5:
                    message.ktype = 5;
                    break;
                case "Min30":
                case 6:
                    message.ktype = 6;
                    break;
                case "Min60":
                case 7:
                    message.ktype = 7;
                    break;
                case "Day":
                case 10:
                    message.ktype = 10;
                    break;
                case "Day7":
                case 11:
                    message.ktype = 11;
                    break;
            }
            if (object.code != null)
                message.code = object.code >>> 0;
            if (object.from != null)
                if ($util.Long)
                    (message.from = $util.Long.fromValue(object.from)).unsigned = false;
                else if (typeof object.from === "string")
                    message.from = parseInt(object.from, 10);
                else if (typeof object.from === "number")
                    message.from = object.from;
                else if (typeof object.from === "object")
                    message.from = new $util.LongBits(object.from.low >>> 0, object.from.high >>> 0).toNumber();
            if (object.total != null)
                message.total = object.total | 0;
            if (object.to != null)
                if ($util.Long)
                    (message.to = $util.Long.fromValue(object.to)).unsigned = false;
                else if (typeof object.to === "string")
                    message.to = parseInt(object.to, 10);
                else if (typeof object.to === "number")
                    message.to = object.to;
                else if (typeof object.to === "object")
                    message.to = new $util.LongBits(object.to.low >>> 0, object.to.high >>> 0).toNumber();
            switch (object.kstyle) {
                case "Random":
                case 0:
                    message.kstyle = 0;
                    break;
                case "Wave":
                case 1:
                    message.kstyle = 1;
                    break;
                case "Up":
                case 2:
                    message.kstyle = 2;
                    break;
                case "Down":
                case 3:
                    message.kstyle = 3;
                    break;
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdQuoteQuery message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdQuoteQuery
         * @static
         * @param {pb.CmdQuoteQuery} message CmdQuoteQuery
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdQuoteQuery.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ktype = options.enums === String ? "KType_NULL" : 0;
                object.code = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.from = options.longs === String ? "0" : 0;
                object.total = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.to = options.longs === String ? "0" : 0;
                object.kstyle = options.enums === String ? "Random" : 0;
            }
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                object.ktype = options.enums === String ? $root.pb.KType[message.ktype] : message.ktype;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.from != null && message.hasOwnProperty("from"))
                if (typeof message.from === "number")
                    object.from = options.longs === String ? String(message.from) : message.from;
                else
                    object.from = options.longs === String ? $util.Long.prototype.toString.call(message.from) : options.longs === Number ? new $util.LongBits(message.from.low >>> 0, message.from.high >>> 0).toNumber() : message.from;
            if (message.total != null && message.hasOwnProperty("total"))
                object.total = message.total;
            if (message.to != null && message.hasOwnProperty("to"))
                if (typeof message.to === "number")
                    object.to = options.longs === String ? String(message.to) : message.to;
                else
                    object.to = options.longs === String ? $util.Long.prototype.toString.call(message.to) : options.longs === Number ? new $util.LongBits(message.to.low >>> 0, message.to.high >>> 0).toNumber() : message.to;
            if (message.kstyle != null && message.hasOwnProperty("kstyle"))
                object.kstyle = options.enums === String ? $root.pb.KStyle[message.kstyle] : message.kstyle;
            return object;
        };

        /**
         * Converts this CmdQuoteQuery to JSON.
         * @function toJSON
         * @memberof pb.CmdQuoteQuery
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdQuoteQuery.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdQuoteQuery;
    })();

    pb.QuoteItem = (function () {

        /**
         * Properties of a QuoteItem.
         * @memberof pb
         * @interface IQuoteItem
         * @property {number|null} [code] QuoteItem code
         * @property {pb.KType|null} [ktype] QuoteItem ktype
         * @property {number|Long|null} [timestamp] QuoteItem timestamp
         * @property {number|null} [price] QuoteItem price
         * @property {number|Long|null} [volume] QuoteItem volume
         * @property {number|null} [amount] QuoteItem amount
         * @property {number|Long|null} [count] QuoteItem count
         * @property {number|null} [open] QuoteItem open
         * @property {number|null} [close] QuoteItem close
         * @property {number|null} [high] QuoteItem high
         * @property {number|null} [low] QuoteItem low
         * @property {Array.<number>|null} [ask5Price] QuoteItem ask5Price
         * @property {Array.<number|Long>|null} [ask5Volume] QuoteItem ask5Volume
         * @property {Array.<number>|null} [bid5Price] QuoteItem bid5Price
         * @property {Array.<number|Long>|null} [bid5Volume] QuoteItem bid5Volume
         */

        /**
         * Constructs a new QuoteItem.
         * @memberof pb
         * @classdesc Represents a QuoteItem.
         * @implements IQuoteItem
         * @constructor
         * @param {pb.IQuoteItem=} [properties] Properties to set
         */
        function QuoteItem(properties) {
            this.ask5Price = [];
            this.ask5Volume = [];
            this.bid5Price = [];
            this.bid5Volume = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuoteItem code.
         * @member {number} code
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.code = 0;

        /**
         * QuoteItem ktype.
         * @member {pb.KType} ktype
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.ktype = 0;

        /**
         * QuoteItem timestamp.
         * @member {number|Long} timestamp
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * QuoteItem price.
         * @member {number} price
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.price = 0;

        /**
         * QuoteItem volume.
         * @member {number|Long} volume
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.volume = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

        /**
         * QuoteItem amount.
         * @member {number} amount
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.amount = 0;

        /**
         * QuoteItem count.
         * @member {number|Long} count
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.count = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

        /**
         * QuoteItem open.
         * @member {number} open
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.open = 0;

        /**
         * QuoteItem close.
         * @member {number} close
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.close = 0;

        /**
         * QuoteItem high.
         * @member {number} high
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.high = 0;

        /**
         * QuoteItem low.
         * @member {number} low
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.low = 0;

        /**
         * QuoteItem ask5Price.
         * @member {Array.<number>} ask5Price
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.ask5Price = $util.emptyArray;

        /**
         * QuoteItem ask5Volume.
         * @member {Array.<number|Long>} ask5Volume
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.ask5Volume = $util.emptyArray;

        /**
         * QuoteItem bid5Price.
         * @member {Array.<number>} bid5Price
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.bid5Price = $util.emptyArray;

        /**
         * QuoteItem bid5Volume.
         * @member {Array.<number|Long>} bid5Volume
         * @memberof pb.QuoteItem
         * @instance
         */
        QuoteItem.prototype.bid5Volume = $util.emptyArray;

        /**
         * Creates a new QuoteItem instance using the specified properties.
         * @function create
         * @memberof pb.QuoteItem
         * @static
         * @param {pb.IQuoteItem=} [properties] Properties to set
         * @returns {pb.QuoteItem} QuoteItem instance
         */
        QuoteItem.create = function create(properties) {
            return new QuoteItem(properties);
        };

        /**
         * Encodes the specified QuoteItem message. Does not implicitly {@link pb.QuoteItem.verify|verify} messages.
         * @function encode
         * @memberof pb.QuoteItem
         * @static
         * @param {pb.IQuoteItem} message QuoteItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuoteItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.code);
            if (message.ktype != null && Object.hasOwnProperty.call(message, "ktype"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ktype);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            if (message.price != null && Object.hasOwnProperty.call(message, "price"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.price);
            if (message.volume != null && Object.hasOwnProperty.call(message, "volume"))
                writer.uint32(/* id 5, wireType 0 =*/40).uint64(message.volume);
            if (message.amount != null && Object.hasOwnProperty.call(message, "amount"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.amount);
            if (message.count != null && Object.hasOwnProperty.call(message, "count"))
                writer.uint32(/* id 7, wireType 0 =*/56).uint64(message.count);
            if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                writer.uint32(/* id 8, wireType 1 =*/65).double(message.open);
            if (message.close != null && Object.hasOwnProperty.call(message, "close"))
                writer.uint32(/* id 9, wireType 1 =*/73).double(message.close);
            if (message.high != null && Object.hasOwnProperty.call(message, "high"))
                writer.uint32(/* id 10, wireType 1 =*/81).double(message.high);
            if (message.low != null && Object.hasOwnProperty.call(message, "low"))
                writer.uint32(/* id 11, wireType 1 =*/89).double(message.low);
            if (message.ask5Price != null && message.ask5Price.length) {
                writer.uint32(/* id 12, wireType 2 =*/98).fork();
                for (var i = 0; i < message.ask5Price.length; ++i)
                    writer.double(message.ask5Price[i]);
                writer.ldelim();
            }
            if (message.ask5Volume != null && message.ask5Volume.length) {
                writer.uint32(/* id 13, wireType 2 =*/106).fork();
                for (var i = 0; i < message.ask5Volume.length; ++i)
                    writer.uint64(message.ask5Volume[i]);
                writer.ldelim();
            }
            if (message.bid5Price != null && message.bid5Price.length) {
                writer.uint32(/* id 14, wireType 2 =*/114).fork();
                for (var i = 0; i < message.bid5Price.length; ++i)
                    writer.double(message.bid5Price[i]);
                writer.ldelim();
            }
            if (message.bid5Volume != null && message.bid5Volume.length) {
                writer.uint32(/* id 15, wireType 2 =*/122).fork();
                for (var i = 0; i < message.bid5Volume.length; ++i)
                    writer.uint64(message.bid5Volume[i]);
                writer.ldelim();
            }
            return writer;
        };

        /**
         * Encodes the specified QuoteItem message, length delimited. Does not implicitly {@link pb.QuoteItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.QuoteItem
         * @static
         * @param {pb.IQuoteItem} message QuoteItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuoteItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuoteItem message from the specified reader or buffer.
         * @function decode
         * @memberof pb.QuoteItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.QuoteItem} QuoteItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuoteItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.QuoteItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.code = reader.uint32();
                        break;
                    case 2:
                        message.ktype = reader.int32();
                        break;
                    case 3:
                        message.timestamp = reader.int64();
                        break;
                    case 4:
                        message.price = reader.double();
                        break;
                    case 5:
                        message.volume = reader.uint64();
                        break;
                    case 6:
                        message.amount = reader.double();
                        break;
                    case 7:
                        message.count = reader.uint64();
                        break;
                    case 8:
                        message.open = reader.double();
                        break;
                    case 9:
                        message.close = reader.double();
                        break;
                    case 10:
                        message.high = reader.double();
                        break;
                    case 11:
                        message.low = reader.double();
                        break;
                    case 12:
                        if (!(message.ask5Price && message.ask5Price.length))
                            message.ask5Price = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ask5Price.push(reader.double());
                        } else
                            message.ask5Price.push(reader.double());
                        break;
                    case 13:
                        if (!(message.ask5Volume && message.ask5Volume.length))
                            message.ask5Volume = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.ask5Volume.push(reader.uint64());
                        } else
                            message.ask5Volume.push(reader.uint64());
                        break;
                    case 14:
                        if (!(message.bid5Price && message.bid5Price.length))
                            message.bid5Price = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.bid5Price.push(reader.double());
                        } else
                            message.bid5Price.push(reader.double());
                        break;
                    case 15:
                        if (!(message.bid5Volume && message.bid5Volume.length))
                            message.bid5Volume = [];
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2)
                                message.bid5Volume.push(reader.uint64());
                        } else
                            message.bid5Volume.push(reader.uint64());
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a QuoteItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.QuoteItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.QuoteItem} QuoteItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuoteItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QuoteItem message.
         * @function verify
         * @memberof pb.QuoteItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QuoteItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                switch (message.ktype) {
                    default:
                        return "ktype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 10:
                    case 11:
                        break;
                }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.price != null && message.hasOwnProperty("price"))
                if (typeof message.price !== "number")
                    return "price: number expected";
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (!$util.isInteger(message.volume) && !(message.volume && $util.isInteger(message.volume.low) && $util.isInteger(message.volume.high)))
                    return "volume: integer|Long expected";
            if (message.amount != null && message.hasOwnProperty("amount"))
                if (typeof message.amount !== "number")
                    return "amount: number expected";
            if (message.count != null && message.hasOwnProperty("count"))
                if (!$util.isInteger(message.count) && !(message.count && $util.isInteger(message.count.low) && $util.isInteger(message.count.high)))
                    return "count: integer|Long expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (typeof message.open !== "number")
                    return "open: number expected";
            if (message.close != null && message.hasOwnProperty("close"))
                if (typeof message.close !== "number")
                    return "close: number expected";
            if (message.high != null && message.hasOwnProperty("high"))
                if (typeof message.high !== "number")
                    return "high: number expected";
            if (message.low != null && message.hasOwnProperty("low"))
                if (typeof message.low !== "number")
                    return "low: number expected";
            if (message.ask5Price != null && message.hasOwnProperty("ask5Price")) {
                if (!Array.isArray(message.ask5Price))
                    return "ask5Price: array expected";
                for (var i = 0; i < message.ask5Price.length; ++i)
                    if (typeof message.ask5Price[i] !== "number")
                        return "ask5Price: number[] expected";
            }
            if (message.ask5Volume != null && message.hasOwnProperty("ask5Volume")) {
                if (!Array.isArray(message.ask5Volume))
                    return "ask5Volume: array expected";
                for (var i = 0; i < message.ask5Volume.length; ++i)
                    if (!$util.isInteger(message.ask5Volume[i]) && !(message.ask5Volume[i] && $util.isInteger(message.ask5Volume[i].low) && $util.isInteger(message.ask5Volume[i].high)))
                        return "ask5Volume: integer|Long[] expected";
            }
            if (message.bid5Price != null && message.hasOwnProperty("bid5Price")) {
                if (!Array.isArray(message.bid5Price))
                    return "bid5Price: array expected";
                for (var i = 0; i < message.bid5Price.length; ++i)
                    if (typeof message.bid5Price[i] !== "number")
                        return "bid5Price: number[] expected";
            }
            if (message.bid5Volume != null && message.hasOwnProperty("bid5Volume")) {
                if (!Array.isArray(message.bid5Volume))
                    return "bid5Volume: array expected";
                for (var i = 0; i < message.bid5Volume.length; ++i)
                    if (!$util.isInteger(message.bid5Volume[i]) && !(message.bid5Volume[i] && $util.isInteger(message.bid5Volume[i].low) && $util.isInteger(message.bid5Volume[i].high)))
                        return "bid5Volume: integer|Long[] expected";
            }
            return null;
        };

        /**
         * Creates a QuoteItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.QuoteItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.QuoteItem} QuoteItem
         */
        QuoteItem.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.QuoteItem)
                return object;
            var message = new $root.pb.QuoteItem();
            if (object.code != null)
                message.code = object.code >>> 0;
            switch (object.ktype) {
                case "KType_NULL":
                case 0:
                    message.ktype = 0;
                    break;
                case "Real":
                case 1:
                    message.ktype = 1;
                    break;
                case "Min":
                case 2:
                    message.ktype = 2;
                    break;
                case "MinToday":
                case 3:
                    message.ktype = 3;
                    break;
                case "Min5":
                case 4:
                    message.ktype = 4;
                    break;
                case "Min15":
                case 5:
                    message.ktype = 5;
                    break;
                case "Min30":
                case 6:
                    message.ktype = 6;
                    break;
                case "Min60":
                case 7:
                    message.ktype = 7;
                    break;
                case "Day":
                case 10:
                    message.ktype = 10;
                    break;
                case "Day7":
                case 11:
                    message.ktype = 11;
                    break;
            }
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.price != null)
                message.price = Number(object.price);
            if (object.volume != null)
                if ($util.Long)
                    (message.volume = $util.Long.fromValue(object.volume)).unsigned = true;
                else if (typeof object.volume === "string")
                    message.volume = parseInt(object.volume, 10);
                else if (typeof object.volume === "number")
                    message.volume = object.volume;
                else if (typeof object.volume === "object")
                    message.volume = new $util.LongBits(object.volume.low >>> 0, object.volume.high >>> 0).toNumber(true);
            if (object.amount != null)
                message.amount = Number(object.amount);
            if (object.count != null)
                if ($util.Long)
                    (message.count = $util.Long.fromValue(object.count)).unsigned = true;
                else if (typeof object.count === "string")
                    message.count = parseInt(object.count, 10);
                else if (typeof object.count === "number")
                    message.count = object.count;
                else if (typeof object.count === "object")
                    message.count = new $util.LongBits(object.count.low >>> 0, object.count.high >>> 0).toNumber(true);
            if (object.open != null)
                message.open = Number(object.open);
            if (object.close != null)
                message.close = Number(object.close);
            if (object.high != null)
                message.high = Number(object.high);
            if (object.low != null)
                message.low = Number(object.low);
            if (object.ask5Price) {
                if (!Array.isArray(object.ask5Price))
                    throw TypeError(".pb.QuoteItem.ask5Price: array expected");
                message.ask5Price = [];
                for (var i = 0; i < object.ask5Price.length; ++i)
                    message.ask5Price[i] = Number(object.ask5Price[i]);
            }
            if (object.ask5Volume) {
                if (!Array.isArray(object.ask5Volume))
                    throw TypeError(".pb.QuoteItem.ask5Volume: array expected");
                message.ask5Volume = [];
                for (var i = 0; i < object.ask5Volume.length; ++i)
                    if ($util.Long)
                        (message.ask5Volume[i] = $util.Long.fromValue(object.ask5Volume[i])).unsigned = true;
                    else if (typeof object.ask5Volume[i] === "string")
                        message.ask5Volume[i] = parseInt(object.ask5Volume[i], 10);
                    else if (typeof object.ask5Volume[i] === "number")
                        message.ask5Volume[i] = object.ask5Volume[i];
                    else if (typeof object.ask5Volume[i] === "object")
                        message.ask5Volume[i] = new $util.LongBits(object.ask5Volume[i].low >>> 0, object.ask5Volume[i].high >>> 0).toNumber(true);
            }
            if (object.bid5Price) {
                if (!Array.isArray(object.bid5Price))
                    throw TypeError(".pb.QuoteItem.bid5Price: array expected");
                message.bid5Price = [];
                for (var i = 0; i < object.bid5Price.length; ++i)
                    message.bid5Price[i] = Number(object.bid5Price[i]);
            }
            if (object.bid5Volume) {
                if (!Array.isArray(object.bid5Volume))
                    throw TypeError(".pb.QuoteItem.bid5Volume: array expected");
                message.bid5Volume = [];
                for (var i = 0; i < object.bid5Volume.length; ++i)
                    if ($util.Long)
                        (message.bid5Volume[i] = $util.Long.fromValue(object.bid5Volume[i])).unsigned = true;
                    else if (typeof object.bid5Volume[i] === "string")
                        message.bid5Volume[i] = parseInt(object.bid5Volume[i], 10);
                    else if (typeof object.bid5Volume[i] === "number")
                        message.bid5Volume[i] = object.bid5Volume[i];
                    else if (typeof object.bid5Volume[i] === "object")
                        message.bid5Volume[i] = new $util.LongBits(object.bid5Volume[i].low >>> 0, object.bid5Volume[i].high >>> 0).toNumber(true);
            }
            return message;
        };

        /**
         * Creates a plain object from a QuoteItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.QuoteItem
         * @static
         * @param {pb.QuoteItem} message QuoteItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QuoteItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults) {
                object.ask5Price = [];
                object.ask5Volume = [];
                object.bid5Price = [];
                object.bid5Volume = [];
            }
            if (options.defaults) {
                object.code = 0;
                object.ktype = options.enums === String ? "KType_NULL" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.price = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.volume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.volume = options.longs === String ? "0" : 0;
                object.amount = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.count = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.count = options.longs === String ? "0" : 0;
                object.open = 0;
                object.close = 0;
                object.high = 0;
                object.low = 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                object.ktype = options.enums === String ? $root.pb.KType[message.ktype] : message.ktype;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.price != null && message.hasOwnProperty("price"))
                object.price = options.json && !isFinite(message.price) ? String(message.price) : message.price;
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (typeof message.volume === "number")
                    object.volume = options.longs === String ? String(message.volume) : message.volume;
                else
                    object.volume = options.longs === String ? $util.Long.prototype.toString.call(message.volume) : options.longs === Number ? new $util.LongBits(message.volume.low >>> 0, message.volume.high >>> 0).toNumber(true) : message.volume;
            if (message.amount != null && message.hasOwnProperty("amount"))
                object.amount = options.json && !isFinite(message.amount) ? String(message.amount) : message.amount;
            if (message.count != null && message.hasOwnProperty("count"))
                if (typeof message.count === "number")
                    object.count = options.longs === String ? String(message.count) : message.count;
                else
                    object.count = options.longs === String ? $util.Long.prototype.toString.call(message.count) : options.longs === Number ? new $util.LongBits(message.count.low >>> 0, message.count.high >>> 0).toNumber(true) : message.count;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = options.json && !isFinite(message.open) ? String(message.open) : message.open;
            if (message.close != null && message.hasOwnProperty("close"))
                object.close = options.json && !isFinite(message.close) ? String(message.close) : message.close;
            if (message.high != null && message.hasOwnProperty("high"))
                object.high = options.json && !isFinite(message.high) ? String(message.high) : message.high;
            if (message.low != null && message.hasOwnProperty("low"))
                object.low = options.json && !isFinite(message.low) ? String(message.low) : message.low;
            if (message.ask5Price && message.ask5Price.length) {
                object.ask5Price = [];
                for (var j = 0; j < message.ask5Price.length; ++j)
                    object.ask5Price[j] = options.json && !isFinite(message.ask5Price[j]) ? String(message.ask5Price[j]) : message.ask5Price[j];
            }
            if (message.ask5Volume && message.ask5Volume.length) {
                object.ask5Volume = [];
                for (var j = 0; j < message.ask5Volume.length; ++j)
                    if (typeof message.ask5Volume[j] === "number")
                        object.ask5Volume[j] = options.longs === String ? String(message.ask5Volume[j]) : message.ask5Volume[j];
                    else
                        object.ask5Volume[j] = options.longs === String ? $util.Long.prototype.toString.call(message.ask5Volume[j]) : options.longs === Number ? new $util.LongBits(message.ask5Volume[j].low >>> 0, message.ask5Volume[j].high >>> 0).toNumber(true) : message.ask5Volume[j];
            }
            if (message.bid5Price && message.bid5Price.length) {
                object.bid5Price = [];
                for (var j = 0; j < message.bid5Price.length; ++j)
                    object.bid5Price[j] = options.json && !isFinite(message.bid5Price[j]) ? String(message.bid5Price[j]) : message.bid5Price[j];
            }
            if (message.bid5Volume && message.bid5Volume.length) {
                object.bid5Volume = [];
                for (var j = 0; j < message.bid5Volume.length; ++j)
                    if (typeof message.bid5Volume[j] === "number")
                        object.bid5Volume[j] = options.longs === String ? String(message.bid5Volume[j]) : message.bid5Volume[j];
                    else
                        object.bid5Volume[j] = options.longs === String ? $util.Long.prototype.toString.call(message.bid5Volume[j]) : options.longs === Number ? new $util.LongBits(message.bid5Volume[j].low >>> 0, message.bid5Volume[j].high >>> 0).toNumber(true) : message.bid5Volume[j];
            }
            return object;
        };

        /**
         * Converts this QuoteItem to JSON.
         * @function toJSON
         * @memberof pb.QuoteItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuoteItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QuoteItem;
    })();

    pb.Quotes = (function () {

        /**
         * Properties of a Quotes.
         * @memberof pb
         * @interface IQuotes
         * @property {Array.<pb.IQuoteItem>|null} [items] Quotes items
         */

        /**
         * Constructs a new Quotes.
         * @memberof pb
         * @classdesc Represents a Quotes.
         * @implements IQuotes
         * @constructor
         * @param {pb.IQuotes=} [properties] Properties to set
         */
        function Quotes(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * Quotes items.
         * @member {Array.<pb.IQuoteItem>} items
         * @memberof pb.Quotes
         * @instance
         */
        Quotes.prototype.items = $util.emptyArray;

        /**
         * Creates a new Quotes instance using the specified properties.
         * @function create
         * @memberof pb.Quotes
         * @static
         * @param {pb.IQuotes=} [properties] Properties to set
         * @returns {pb.Quotes} Quotes instance
         */
        Quotes.create = function create(properties) {
            return new Quotes(properties);
        };

        /**
         * Encodes the specified Quotes message. Does not implicitly {@link pb.Quotes.verify|verify} messages.
         * @function encode
         * @memberof pb.Quotes
         * @static
         * @param {pb.IQuotes} message Quotes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Quotes.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.pb.QuoteItem.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified Quotes message, length delimited. Does not implicitly {@link pb.Quotes.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.Quotes
         * @static
         * @param {pb.IQuotes} message Quotes message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        Quotes.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a Quotes message from the specified reader or buffer.
         * @function decode
         * @memberof pb.Quotes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.Quotes} Quotes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Quotes.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.Quotes();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.pb.QuoteItem.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a Quotes message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.Quotes
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.Quotes} Quotes
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        Quotes.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a Quotes message.
         * @function verify
         * @memberof pb.Quotes
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        Quotes.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.pb.QuoteItem.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a Quotes message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.Quotes
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.Quotes} Quotes
         */
        Quotes.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.Quotes)
                return object;
            var message = new $root.pb.Quotes();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".pb.Quotes.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".pb.Quotes.items: object expected");
                    message.items[i] = $root.pb.QuoteItem.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a Quotes message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.Quotes
         * @static
         * @param {pb.Quotes} message Quotes
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        Quotes.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.pb.QuoteItem.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this Quotes to JSON.
         * @function toJSON
         * @memberof pb.Quotes
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        Quotes.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return Quotes;
    })();

    pb.QuoteSubscribeItem = (function () {

        /**
         * Properties of a QuoteSubscribeItem.
         * @memberof pb
         * @interface IQuoteSubscribeItem
         * @property {string|null} [code] QuoteSubscribeItem code
         * @property {boolean|null} [flag] QuoteSubscribeItem flag
         */

        /**
         * Constructs a new QuoteSubscribeItem.
         * @memberof pb
         * @classdesc Represents a QuoteSubscribeItem.
         * @implements IQuoteSubscribeItem
         * @constructor
         * @param {pb.IQuoteSubscribeItem=} [properties] Properties to set
         */
        function QuoteSubscribeItem(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuoteSubscribeItem code.
         * @member {string} code
         * @memberof pb.QuoteSubscribeItem
         * @instance
         */
        QuoteSubscribeItem.prototype.code = "";

        /**
         * QuoteSubscribeItem flag.
         * @member {boolean} flag
         * @memberof pb.QuoteSubscribeItem
         * @instance
         */
        QuoteSubscribeItem.prototype.flag = false;

        /**
         * Creates a new QuoteSubscribeItem instance using the specified properties.
         * @function create
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {pb.IQuoteSubscribeItem=} [properties] Properties to set
         * @returns {pb.QuoteSubscribeItem} QuoteSubscribeItem instance
         */
        QuoteSubscribeItem.create = function create(properties) {
            return new QuoteSubscribeItem(properties);
        };

        /**
         * Encodes the specified QuoteSubscribeItem message. Does not implicitly {@link pb.QuoteSubscribeItem.verify|verify} messages.
         * @function encode
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {pb.IQuoteSubscribeItem} message QuoteSubscribeItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuoteSubscribeItem.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
            if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
                writer.uint32(/* id 2, wireType 0 =*/16).bool(message.flag);
            return writer;
        };

        /**
         * Encodes the specified QuoteSubscribeItem message, length delimited. Does not implicitly {@link pb.QuoteSubscribeItem.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {pb.IQuoteSubscribeItem} message QuoteSubscribeItem message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuoteSubscribeItem.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuoteSubscribeItem message from the specified reader or buffer.
         * @function decode
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.QuoteSubscribeItem} QuoteSubscribeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuoteSubscribeItem.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.QuoteSubscribeItem();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.code = reader.string();
                        break;
                    case 2:
                        message.flag = reader.bool();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a QuoteSubscribeItem message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.QuoteSubscribeItem} QuoteSubscribeItem
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuoteSubscribeItem.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QuoteSubscribeItem message.
         * @function verify
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QuoteSubscribeItem.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isString(message.code))
                    return "code: string expected";
            if (message.flag != null && message.hasOwnProperty("flag"))
                if (typeof message.flag !== "boolean")
                    return "flag: boolean expected";
            return null;
        };

        /**
         * Creates a QuoteSubscribeItem message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.QuoteSubscribeItem} QuoteSubscribeItem
         */
        QuoteSubscribeItem.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.QuoteSubscribeItem)
                return object;
            var message = new $root.pb.QuoteSubscribeItem();
            if (object.code != null)
                message.code = String(object.code);
            if (object.flag != null)
                message.flag = Boolean(object.flag);
            return message;
        };

        /**
         * Creates a plain object from a QuoteSubscribeItem message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.QuoteSubscribeItem
         * @static
         * @param {pb.QuoteSubscribeItem} message QuoteSubscribeItem
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QuoteSubscribeItem.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = "";
                object.flag = false;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.flag != null && message.hasOwnProperty("flag"))
                object.flag = message.flag;
            return object;
        };

        /**
         * Converts this QuoteSubscribeItem to JSON.
         * @function toJSON
         * @memberof pb.QuoteSubscribeItem
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuoteSubscribeItem.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QuoteSubscribeItem;
    })();

    pb.CmdQuoteSubscribe = (function () {

        /**
         * Properties of a CmdQuoteSubscribe.
         * @memberof pb
         * @interface ICmdQuoteSubscribe
         * @property {Array.<pb.IQuoteSubscribeItem>|null} [items] CmdQuoteSubscribe items
         */

        /**
         * Constructs a new CmdQuoteSubscribe.
         * @memberof pb
         * @classdesc Represents a CmdQuoteSubscribe.
         * @implements ICmdQuoteSubscribe
         * @constructor
         * @param {pb.ICmdQuoteSubscribe=} [properties] Properties to set
         */
        function CmdQuoteSubscribe(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdQuoteSubscribe items.
         * @member {Array.<pb.IQuoteSubscribeItem>} items
         * @memberof pb.CmdQuoteSubscribe
         * @instance
         */
        CmdQuoteSubscribe.prototype.items = $util.emptyArray;

        /**
         * Creates a new CmdQuoteSubscribe instance using the specified properties.
         * @function create
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {pb.ICmdQuoteSubscribe=} [properties] Properties to set
         * @returns {pb.CmdQuoteSubscribe} CmdQuoteSubscribe instance
         */
        CmdQuoteSubscribe.create = function create(properties) {
            return new CmdQuoteSubscribe(properties);
        };

        /**
         * Encodes the specified CmdQuoteSubscribe message. Does not implicitly {@link pb.CmdQuoteSubscribe.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {pb.ICmdQuoteSubscribe} message CmdQuoteSubscribe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQuoteSubscribe.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.pb.QuoteSubscribeItem.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified CmdQuoteSubscribe message, length delimited. Does not implicitly {@link pb.CmdQuoteSubscribe.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {pb.ICmdQuoteSubscribe} message CmdQuoteSubscribe message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQuoteSubscribe.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdQuoteSubscribe message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdQuoteSubscribe} CmdQuoteSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQuoteSubscribe.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdQuoteSubscribe();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.pb.QuoteSubscribeItem.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdQuoteSubscribe message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdQuoteSubscribe} CmdQuoteSubscribe
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQuoteSubscribe.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdQuoteSubscribe message.
         * @function verify
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdQuoteSubscribe.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.pb.QuoteSubscribeItem.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a CmdQuoteSubscribe message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdQuoteSubscribe} CmdQuoteSubscribe
         */
        CmdQuoteSubscribe.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdQuoteSubscribe)
                return object;
            var message = new $root.pb.CmdQuoteSubscribe();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".pb.CmdQuoteSubscribe.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".pb.CmdQuoteSubscribe.items: object expected");
                    message.items[i] = $root.pb.QuoteSubscribeItem.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdQuoteSubscribe message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdQuoteSubscribe
         * @static
         * @param {pb.CmdQuoteSubscribe} message CmdQuoteSubscribe
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdQuoteSubscribe.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.pb.QuoteSubscribeItem.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this CmdQuoteSubscribe to JSON.
         * @function toJSON
         * @memberof pb.CmdQuoteSubscribe
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdQuoteSubscribe.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdQuoteSubscribe;
    })();

    pb.CmdQuoteQueryFuture = (function () {

        /**
         * Properties of a CmdQuoteQueryFuture.
         * @memberof pb
         * @interface ICmdQuoteQueryFuture
         * @property {pb.KType|null} [ktype] CmdQuoteQueryFuture ktype
         * @property {number|null} [code] CmdQuoteQueryFuture code
         * @property {number|Long|null} [from] CmdQuoteQueryFuture from
         * @property {number|null} [total] CmdQuoteQueryFuture total
         * @property {number|Long|null} [to] CmdQuoteQueryFuture to
         */

        /**
         * Constructs a new CmdQuoteQueryFuture.
         * @memberof pb
         * @classdesc Represents a CmdQuoteQueryFuture.
         * @implements ICmdQuoteQueryFuture
         * @constructor
         * @param {pb.ICmdQuoteQueryFuture=} [properties] Properties to set
         */
        function CmdQuoteQueryFuture(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdQuoteQueryFuture ktype.
         * @member {pb.KType} ktype
         * @memberof pb.CmdQuoteQueryFuture
         * @instance
         */
        CmdQuoteQueryFuture.prototype.ktype = 0;

        /**
         * CmdQuoteQueryFuture code.
         * @member {number} code
         * @memberof pb.CmdQuoteQueryFuture
         * @instance
         */
        CmdQuoteQueryFuture.prototype.code = 0;

        /**
         * CmdQuoteQueryFuture from.
         * @member {number|Long} from
         * @memberof pb.CmdQuoteQueryFuture
         * @instance
         */
        CmdQuoteQueryFuture.prototype.from = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * CmdQuoteQueryFuture total.
         * @member {number} total
         * @memberof pb.CmdQuoteQueryFuture
         * @instance
         */
        CmdQuoteQueryFuture.prototype.total = 0;

        /**
         * CmdQuoteQueryFuture to.
         * @member {number|Long} to
         * @memberof pb.CmdQuoteQueryFuture
         * @instance
         */
        CmdQuoteQueryFuture.prototype.to = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * Creates a new CmdQuoteQueryFuture instance using the specified properties.
         * @function create
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {pb.ICmdQuoteQueryFuture=} [properties] Properties to set
         * @returns {pb.CmdQuoteQueryFuture} CmdQuoteQueryFuture instance
         */
        CmdQuoteQueryFuture.create = function create(properties) {
            return new CmdQuoteQueryFuture(properties);
        };

        /**
         * Encodes the specified CmdQuoteQueryFuture message. Does not implicitly {@link pb.CmdQuoteQueryFuture.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {pb.ICmdQuoteQueryFuture} message CmdQuoteQueryFuture message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQuoteQueryFuture.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.ktype != null && Object.hasOwnProperty.call(message, "ktype"))
                writer.uint32(/* id 1, wireType 0 =*/8).int32(message.ktype);
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.code);
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.from);
            if (message.total != null && Object.hasOwnProperty.call(message, "total"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.total);
            if (message.to != null && Object.hasOwnProperty.call(message, "to"))
                writer.uint32(/* id 5, wireType 0 =*/40).int64(message.to);
            return writer;
        };

        /**
         * Encodes the specified CmdQuoteQueryFuture message, length delimited. Does not implicitly {@link pb.CmdQuoteQueryFuture.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {pb.ICmdQuoteQueryFuture} message CmdQuoteQueryFuture message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdQuoteQueryFuture.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdQuoteQueryFuture message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdQuoteQueryFuture} CmdQuoteQueryFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQuoteQueryFuture.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdQuoteQueryFuture();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.ktype = reader.int32();
                        break;
                    case 2:
                        message.code = reader.uint32();
                        break;
                    case 3:
                        message.from = reader.int64();
                        break;
                    case 4:
                        message.total = reader.int32();
                        break;
                    case 5:
                        message.to = reader.int64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdQuoteQueryFuture message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdQuoteQueryFuture} CmdQuoteQueryFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdQuoteQueryFuture.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdQuoteQueryFuture message.
         * @function verify
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdQuoteQueryFuture.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                switch (message.ktype) {
                    default:
                        return "ktype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 10:
                    case 11:
                        break;
                }
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.from != null && message.hasOwnProperty("from"))
                if (!$util.isInteger(message.from) && !(message.from && $util.isInteger(message.from.low) && $util.isInteger(message.from.high)))
                    return "from: integer|Long expected";
            if (message.total != null && message.hasOwnProperty("total"))
                if (!$util.isInteger(message.total))
                    return "total: integer expected";
            if (message.to != null && message.hasOwnProperty("to"))
                if (!$util.isInteger(message.to) && !(message.to && $util.isInteger(message.to.low) && $util.isInteger(message.to.high)))
                    return "to: integer|Long expected";
            return null;
        };

        /**
         * Creates a CmdQuoteQueryFuture message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdQuoteQueryFuture} CmdQuoteQueryFuture
         */
        CmdQuoteQueryFuture.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdQuoteQueryFuture)
                return object;
            var message = new $root.pb.CmdQuoteQueryFuture();
            switch (object.ktype) {
                case "KType_NULL":
                case 0:
                    message.ktype = 0;
                    break;
                case "Real":
                case 1:
                    message.ktype = 1;
                    break;
                case "Min":
                case 2:
                    message.ktype = 2;
                    break;
                case "MinToday":
                case 3:
                    message.ktype = 3;
                    break;
                case "Min5":
                case 4:
                    message.ktype = 4;
                    break;
                case "Min15":
                case 5:
                    message.ktype = 5;
                    break;
                case "Min30":
                case 6:
                    message.ktype = 6;
                    break;
                case "Min60":
                case 7:
                    message.ktype = 7;
                    break;
                case "Day":
                case 10:
                    message.ktype = 10;
                    break;
                case "Day7":
                case 11:
                    message.ktype = 11;
                    break;
            }
            if (object.code != null)
                message.code = object.code >>> 0;
            if (object.from != null)
                if ($util.Long)
                    (message.from = $util.Long.fromValue(object.from)).unsigned = false;
                else if (typeof object.from === "string")
                    message.from = parseInt(object.from, 10);
                else if (typeof object.from === "number")
                    message.from = object.from;
                else if (typeof object.from === "object")
                    message.from = new $util.LongBits(object.from.low >>> 0, object.from.high >>> 0).toNumber();
            if (object.total != null)
                message.total = object.total | 0;
            if (object.to != null)
                if ($util.Long)
                    (message.to = $util.Long.fromValue(object.to)).unsigned = false;
                else if (typeof object.to === "string")
                    message.to = parseInt(object.to, 10);
                else if (typeof object.to === "number")
                    message.to = object.to;
                else if (typeof object.to === "object")
                    message.to = new $util.LongBits(object.to.low >>> 0, object.to.high >>> 0).toNumber();
            return message;
        };

        /**
         * Creates a plain object from a CmdQuoteQueryFuture message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdQuoteQueryFuture
         * @static
         * @param {pb.CmdQuoteQueryFuture} message CmdQuoteQueryFuture
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdQuoteQueryFuture.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.ktype = options.enums === String ? "KType_NULL" : 0;
                object.code = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.from = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.from = options.longs === String ? "0" : 0;
                object.total = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.to = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.to = options.longs === String ? "0" : 0;
            }
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                object.ktype = options.enums === String ? $root.pb.KType[message.ktype] : message.ktype;
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.from != null && message.hasOwnProperty("from"))
                if (typeof message.from === "number")
                    object.from = options.longs === String ? String(message.from) : message.from;
                else
                    object.from = options.longs === String ? $util.Long.prototype.toString.call(message.from) : options.longs === Number ? new $util.LongBits(message.from.low >>> 0, message.from.high >>> 0).toNumber() : message.from;
            if (message.total != null && message.hasOwnProperty("total"))
                object.total = message.total;
            if (message.to != null && message.hasOwnProperty("to"))
                if (typeof message.to === "number")
                    object.to = options.longs === String ? String(message.to) : message.to;
                else
                    object.to = options.longs === String ? $util.Long.prototype.toString.call(message.to) : options.longs === Number ? new $util.LongBits(message.to.low >>> 0, message.to.high >>> 0).toNumber() : message.to;
            return object;
        };

        /**
         * Converts this CmdQuoteQueryFuture to JSON.
         * @function toJSON
         * @memberof pb.CmdQuoteQueryFuture
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdQuoteQueryFuture.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdQuoteQueryFuture;
    })();

    pb.QuoteItemFuture = (function () {

        /**
         * Properties of a QuoteItemFuture.
         * @memberof pb
         * @interface IQuoteItemFuture
         * @property {number|null} [code] QuoteItemFuture code
         * @property {pb.KType|null} [ktype] QuoteItemFuture ktype
         * @property {number|Long|null} [timestamp] QuoteItemFuture timestamp
         * @property {number|null} [open] QuoteItemFuture open
         * @property {number|null} [close] QuoteItemFuture close
         * @property {number|null} [high] QuoteItemFuture high
         * @property {number|null} [low] QuoteItemFuture low
         * @property {number|Long|null} [volume] QuoteItemFuture volume
         * @property {number|Long|null} [cclHold] QuoteItemFuture cclHold
         */

        /**
         * Constructs a new QuoteItemFuture.
         * @memberof pb
         * @classdesc Represents a QuoteItemFuture.
         * @implements IQuoteItemFuture
         * @constructor
         * @param {pb.IQuoteItemFuture=} [properties] Properties to set
         */
        function QuoteItemFuture(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuoteItemFuture code.
         * @member {number} code
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.code = 0;

        /**
         * QuoteItemFuture ktype.
         * @member {pb.KType} ktype
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.ktype = 0;

        /**
         * QuoteItemFuture timestamp.
         * @member {number|Long} timestamp
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;

        /**
         * QuoteItemFuture open.
         * @member {number} open
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.open = 0;

        /**
         * QuoteItemFuture close.
         * @member {number} close
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.close = 0;

        /**
         * QuoteItemFuture high.
         * @member {number} high
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.high = 0;

        /**
         * QuoteItemFuture low.
         * @member {number} low
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.low = 0;

        /**
         * QuoteItemFuture volume.
         * @member {number|Long} volume
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.volume = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

        /**
         * QuoteItemFuture cclHold.
         * @member {number|Long} cclHold
         * @memberof pb.QuoteItemFuture
         * @instance
         */
        QuoteItemFuture.prototype.cclHold = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;

        /**
         * Creates a new QuoteItemFuture instance using the specified properties.
         * @function create
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {pb.IQuoteItemFuture=} [properties] Properties to set
         * @returns {pb.QuoteItemFuture} QuoteItemFuture instance
         */
        QuoteItemFuture.create = function create(properties) {
            return new QuoteItemFuture(properties);
        };

        /**
         * Encodes the specified QuoteItemFuture message. Does not implicitly {@link pb.QuoteItemFuture.verify|verify} messages.
         * @function encode
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {pb.IQuoteItemFuture} message QuoteItemFuture message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuoteItemFuture.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.code);
            if (message.ktype != null && Object.hasOwnProperty.call(message, "ktype"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.ktype);
            if (message.timestamp != null && Object.hasOwnProperty.call(message, "timestamp"))
                writer.uint32(/* id 3, wireType 0 =*/24).int64(message.timestamp);
            if (message.open != null && Object.hasOwnProperty.call(message, "open"))
                writer.uint32(/* id 4, wireType 1 =*/33).double(message.open);
            if (message.close != null && Object.hasOwnProperty.call(message, "close"))
                writer.uint32(/* id 5, wireType 1 =*/41).double(message.close);
            if (message.high != null && Object.hasOwnProperty.call(message, "high"))
                writer.uint32(/* id 6, wireType 1 =*/49).double(message.high);
            if (message.low != null && Object.hasOwnProperty.call(message, "low"))
                writer.uint32(/* id 7, wireType 1 =*/57).double(message.low);
            if (message.volume != null && Object.hasOwnProperty.call(message, "volume"))
                writer.uint32(/* id 8, wireType 0 =*/64).uint64(message.volume);
            if (message.cclHold != null && Object.hasOwnProperty.call(message, "cclHold"))
                writer.uint32(/* id 9, wireType 0 =*/72).uint64(message.cclHold);
            return writer;
        };

        /**
         * Encodes the specified QuoteItemFuture message, length delimited. Does not implicitly {@link pb.QuoteItemFuture.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {pb.IQuoteItemFuture} message QuoteItemFuture message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuoteItemFuture.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuoteItemFuture message from the specified reader or buffer.
         * @function decode
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.QuoteItemFuture} QuoteItemFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuoteItemFuture.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.QuoteItemFuture();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.code = reader.uint32();
                        break;
                    case 2:
                        message.ktype = reader.int32();
                        break;
                    case 3:
                        message.timestamp = reader.int64();
                        break;
                    case 4:
                        message.open = reader.double();
                        break;
                    case 5:
                        message.close = reader.double();
                        break;
                    case 6:
                        message.high = reader.double();
                        break;
                    case 7:
                        message.low = reader.double();
                        break;
                    case 8:
                        message.volume = reader.uint64();
                        break;
                    case 9:
                        message.cclHold = reader.uint64();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a QuoteItemFuture message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.QuoteItemFuture} QuoteItemFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuoteItemFuture.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QuoteItemFuture message.
         * @function verify
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QuoteItemFuture.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.code != null && message.hasOwnProperty("code"))
                if (!$util.isInteger(message.code))
                    return "code: integer expected";
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                switch (message.ktype) {
                    default:
                        return "ktype: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                    case 6:
                    case 7:
                    case 10:
                    case 11:
                        break;
                }
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (!$util.isInteger(message.timestamp) && !(message.timestamp && $util.isInteger(message.timestamp.low) && $util.isInteger(message.timestamp.high)))
                    return "timestamp: integer|Long expected";
            if (message.open != null && message.hasOwnProperty("open"))
                if (typeof message.open !== "number")
                    return "open: number expected";
            if (message.close != null && message.hasOwnProperty("close"))
                if (typeof message.close !== "number")
                    return "close: number expected";
            if (message.high != null && message.hasOwnProperty("high"))
                if (typeof message.high !== "number")
                    return "high: number expected";
            if (message.low != null && message.hasOwnProperty("low"))
                if (typeof message.low !== "number")
                    return "low: number expected";
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (!$util.isInteger(message.volume) && !(message.volume && $util.isInteger(message.volume.low) && $util.isInteger(message.volume.high)))
                    return "volume: integer|Long expected";
            if (message.cclHold != null && message.hasOwnProperty("cclHold"))
                if (!$util.isInteger(message.cclHold) && !(message.cclHold && $util.isInteger(message.cclHold.low) && $util.isInteger(message.cclHold.high)))
                    return "cclHold: integer|Long expected";
            return null;
        };

        /**
         * Creates a QuoteItemFuture message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.QuoteItemFuture} QuoteItemFuture
         */
        QuoteItemFuture.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.QuoteItemFuture)
                return object;
            var message = new $root.pb.QuoteItemFuture();
            if (object.code != null)
                message.code = object.code >>> 0;
            switch (object.ktype) {
                case "KType_NULL":
                case 0:
                    message.ktype = 0;
                    break;
                case "Real":
                case 1:
                    message.ktype = 1;
                    break;
                case "Min":
                case 2:
                    message.ktype = 2;
                    break;
                case "MinToday":
                case 3:
                    message.ktype = 3;
                    break;
                case "Min5":
                case 4:
                    message.ktype = 4;
                    break;
                case "Min15":
                case 5:
                    message.ktype = 5;
                    break;
                case "Min30":
                case 6:
                    message.ktype = 6;
                    break;
                case "Min60":
                case 7:
                    message.ktype = 7;
                    break;
                case "Day":
                case 10:
                    message.ktype = 10;
                    break;
                case "Day7":
                case 11:
                    message.ktype = 11;
                    break;
            }
            if (object.timestamp != null)
                if ($util.Long)
                    (message.timestamp = $util.Long.fromValue(object.timestamp)).unsigned = false;
                else if (typeof object.timestamp === "string")
                    message.timestamp = parseInt(object.timestamp, 10);
                else if (typeof object.timestamp === "number")
                    message.timestamp = object.timestamp;
                else if (typeof object.timestamp === "object")
                    message.timestamp = new $util.LongBits(object.timestamp.low >>> 0, object.timestamp.high >>> 0).toNumber();
            if (object.open != null)
                message.open = Number(object.open);
            if (object.close != null)
                message.close = Number(object.close);
            if (object.high != null)
                message.high = Number(object.high);
            if (object.low != null)
                message.low = Number(object.low);
            if (object.volume != null)
                if ($util.Long)
                    (message.volume = $util.Long.fromValue(object.volume)).unsigned = true;
                else if (typeof object.volume === "string")
                    message.volume = parseInt(object.volume, 10);
                else if (typeof object.volume === "number")
                    message.volume = object.volume;
                else if (typeof object.volume === "object")
                    message.volume = new $util.LongBits(object.volume.low >>> 0, object.volume.high >>> 0).toNumber(true);
            if (object.cclHold != null)
                if ($util.Long)
                    (message.cclHold = $util.Long.fromValue(object.cclHold)).unsigned = true;
                else if (typeof object.cclHold === "string")
                    message.cclHold = parseInt(object.cclHold, 10);
                else if (typeof object.cclHold === "number")
                    message.cclHold = object.cclHold;
                else if (typeof object.cclHold === "object")
                    message.cclHold = new $util.LongBits(object.cclHold.low >>> 0, object.cclHold.high >>> 0).toNumber(true);
            return message;
        };

        /**
         * Creates a plain object from a QuoteItemFuture message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.QuoteItemFuture
         * @static
         * @param {pb.QuoteItemFuture} message QuoteItemFuture
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QuoteItemFuture.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.code = 0;
                object.ktype = options.enums === String ? "KType_NULL" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, false);
                    object.timestamp = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.timestamp = options.longs === String ? "0" : 0;
                object.open = 0;
                object.close = 0;
                object.high = 0;
                object.low = 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.volume = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.volume = options.longs === String ? "0" : 0;
                if ($util.Long) {
                    var long = new $util.Long(0, 0, true);
                    object.cclHold = options.longs === String ? long.toString() : options.longs === Number ? long.toNumber() : long;
                } else
                    object.cclHold = options.longs === String ? "0" : 0;
            }
            if (message.code != null && message.hasOwnProperty("code"))
                object.code = message.code;
            if (message.ktype != null && message.hasOwnProperty("ktype"))
                object.ktype = options.enums === String ? $root.pb.KType[message.ktype] : message.ktype;
            if (message.timestamp != null && message.hasOwnProperty("timestamp"))
                if (typeof message.timestamp === "number")
                    object.timestamp = options.longs === String ? String(message.timestamp) : message.timestamp;
                else
                    object.timestamp = options.longs === String ? $util.Long.prototype.toString.call(message.timestamp) : options.longs === Number ? new $util.LongBits(message.timestamp.low >>> 0, message.timestamp.high >>> 0).toNumber() : message.timestamp;
            if (message.open != null && message.hasOwnProperty("open"))
                object.open = options.json && !isFinite(message.open) ? String(message.open) : message.open;
            if (message.close != null && message.hasOwnProperty("close"))
                object.close = options.json && !isFinite(message.close) ? String(message.close) : message.close;
            if (message.high != null && message.hasOwnProperty("high"))
                object.high = options.json && !isFinite(message.high) ? String(message.high) : message.high;
            if (message.low != null && message.hasOwnProperty("low"))
                object.low = options.json && !isFinite(message.low) ? String(message.low) : message.low;
            if (message.volume != null && message.hasOwnProperty("volume"))
                if (typeof message.volume === "number")
                    object.volume = options.longs === String ? String(message.volume) : message.volume;
                else
                    object.volume = options.longs === String ? $util.Long.prototype.toString.call(message.volume) : options.longs === Number ? new $util.LongBits(message.volume.low >>> 0, message.volume.high >>> 0).toNumber(true) : message.volume;
            if (message.cclHold != null && message.hasOwnProperty("cclHold"))
                if (typeof message.cclHold === "number")
                    object.cclHold = options.longs === String ? String(message.cclHold) : message.cclHold;
                else
                    object.cclHold = options.longs === String ? $util.Long.prototype.toString.call(message.cclHold) : options.longs === Number ? new $util.LongBits(message.cclHold.low >>> 0, message.cclHold.high >>> 0).toNumber(true) : message.cclHold;
            return object;
        };

        /**
         * Converts this QuoteItemFuture to JSON.
         * @function toJSON
         * @memberof pb.QuoteItemFuture
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuoteItemFuture.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QuoteItemFuture;
    })();

    pb.QuotesFuture = (function () {

        /**
         * Properties of a QuotesFuture.
         * @memberof pb
         * @interface IQuotesFuture
         * @property {Array.<pb.IQuoteItemFuture>|null} [items] QuotesFuture items
         */

        /**
         * Constructs a new QuotesFuture.
         * @memberof pb
         * @classdesc Represents a QuotesFuture.
         * @implements IQuotesFuture
         * @constructor
         * @param {pb.IQuotesFuture=} [properties] Properties to set
         */
        function QuotesFuture(properties) {
            this.items = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * QuotesFuture items.
         * @member {Array.<pb.IQuoteItemFuture>} items
         * @memberof pb.QuotesFuture
         * @instance
         */
        QuotesFuture.prototype.items = $util.emptyArray;

        /**
         * Creates a new QuotesFuture instance using the specified properties.
         * @function create
         * @memberof pb.QuotesFuture
         * @static
         * @param {pb.IQuotesFuture=} [properties] Properties to set
         * @returns {pb.QuotesFuture} QuotesFuture instance
         */
        QuotesFuture.create = function create(properties) {
            return new QuotesFuture(properties);
        };

        /**
         * Encodes the specified QuotesFuture message. Does not implicitly {@link pb.QuotesFuture.verify|verify} messages.
         * @function encode
         * @memberof pb.QuotesFuture
         * @static
         * @param {pb.IQuotesFuture} message QuotesFuture message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuotesFuture.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.items != null && message.items.length)
                for (var i = 0; i < message.items.length; ++i)
                    $root.pb.QuoteItemFuture.encode(message.items[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified QuotesFuture message, length delimited. Does not implicitly {@link pb.QuotesFuture.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.QuotesFuture
         * @static
         * @param {pb.IQuotesFuture} message QuotesFuture message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        QuotesFuture.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a QuotesFuture message from the specified reader or buffer.
         * @function decode
         * @memberof pb.QuotesFuture
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.QuotesFuture} QuotesFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuotesFuture.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.QuotesFuture();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        if (!(message.items && message.items.length))
                            message.items = [];
                        message.items.push($root.pb.QuoteItemFuture.decode(reader, reader.uint32()));
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a QuotesFuture message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.QuotesFuture
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.QuotesFuture} QuotesFuture
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        QuotesFuture.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a QuotesFuture message.
         * @function verify
         * @memberof pb.QuotesFuture
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        QuotesFuture.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.items != null && message.hasOwnProperty("items")) {
                if (!Array.isArray(message.items))
                    return "items: array expected";
                for (var i = 0; i < message.items.length; ++i) {
                    var error = $root.pb.QuoteItemFuture.verify(message.items[i]);
                    if (error)
                        return "items." + error;
                }
            }
            return null;
        };

        /**
         * Creates a QuotesFuture message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.QuotesFuture
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.QuotesFuture} QuotesFuture
         */
        QuotesFuture.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.QuotesFuture)
                return object;
            var message = new $root.pb.QuotesFuture();
            if (object.items) {
                if (!Array.isArray(object.items))
                    throw TypeError(".pb.QuotesFuture.items: array expected");
                message.items = [];
                for (var i = 0; i < object.items.length; ++i) {
                    if (typeof object.items[i] !== "object")
                        throw TypeError(".pb.QuotesFuture.items: object expected");
                    message.items[i] = $root.pb.QuoteItemFuture.fromObject(object.items[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a QuotesFuture message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.QuotesFuture
         * @static
         * @param {pb.QuotesFuture} message QuotesFuture
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        QuotesFuture.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.items = [];
            if (message.items && message.items.length) {
                object.items = [];
                for (var j = 0; j < message.items.length; ++j)
                    object.items[j] = $root.pb.QuoteItemFuture.toObject(message.items[j], options);
            }
            return object;
        };

        /**
         * Converts this QuotesFuture to JSON.
         * @function toJSON
         * @memberof pb.QuotesFuture
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        QuotesFuture.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return QuotesFuture;
    })();

    pb.QuotesService = (function () {

        /**
         * Constructs a new QuotesService service.
         * @memberof pb
         * @classdesc Represents a QuotesService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function QuotesService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (QuotesService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = QuotesService;

        /**
         * Creates new QuotesService service using the specified rpc implementation.
         * @function create
         * @memberof pb.QuotesService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {QuotesService} RPC service. Useful where requests and/or responses are streamed.
         */
        QuotesService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link pb.QuotesService#quotesQuery}.
         * @memberof pb.QuotesService
         * @typedef QuotesQueryCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.Quotes} [response] Quotes
         */

        /**
         * Calls QuotesQuery.
         * @function quotesQuery
         * @memberof pb.QuotesService
         * @instance
         * @param {pb.ICmdQuoteQuery} request CmdQuoteQuery message or plain object
         * @param {pb.QuotesService.QuotesQueryCallback} callback Node-style callback called with the error, if any, and Quotes
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(QuotesService.prototype.quotesQuery = function quotesQuery(request, callback) {
            return this.rpcCall(quotesQuery, $root.pb.CmdQuoteQuery, $root.pb.Quotes, request, callback);
        }, "name", { value: "QuotesQuery" });

        /**
         * Calls QuotesQuery.
         * @function quotesQuery
         * @memberof pb.QuotesService
         * @instance
         * @param {pb.ICmdQuoteQuery} request CmdQuoteQuery message or plain object
         * @returns {Promise<pb.Quotes>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.QuotesService#quotesSubscribe}.
         * @memberof pb.QuotesService
         * @typedef QuotesSubscribeCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.ErrorInfo} [response] ErrorInfo
         */

        /**
         * Calls QuotesSubscribe.
         * @function quotesSubscribe
         * @memberof pb.QuotesService
         * @instance
         * @param {pb.ICmdQuoteSubscribe} request CmdQuoteSubscribe message or plain object
         * @param {pb.QuotesService.QuotesSubscribeCallback} callback Node-style callback called with the error, if any, and ErrorInfo
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(QuotesService.prototype.quotesSubscribe = function quotesSubscribe(request, callback) {
            return this.rpcCall(quotesSubscribe, $root.pb.CmdQuoteSubscribe, $root.pb.ErrorInfo, request, callback);
        }, "name", { value: "QuotesSubscribe" });

        /**
         * Calls QuotesSubscribe.
         * @function quotesSubscribe
         * @memberof pb.QuotesService
         * @instance
         * @param {pb.ICmdQuoteSubscribe} request CmdQuoteSubscribe message or plain object
         * @returns {Promise<pb.ErrorInfo>} Promise
         * @variation 2
         */

        return QuotesService;
    })();

    pb.QuotesFutureService = (function () {

        /**
         * Constructs a new QuotesFutureService service.
         * @memberof pb
         * @classdesc Represents a QuotesFutureService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function QuotesFutureService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (QuotesFutureService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = QuotesFutureService;

        /**
         * Creates new QuotesFutureService service using the specified rpc implementation.
         * @function create
         * @memberof pb.QuotesFutureService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {QuotesFutureService} RPC service. Useful where requests and/or responses are streamed.
         */
        QuotesFutureService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link pb.QuotesFutureService#quotesQuery}.
         * @memberof pb.QuotesFutureService
         * @typedef QuotesQueryCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.QuotesFuture} [response] QuotesFuture
         */

        /**
         * Calls QuotesQuery.
         * @function quotesQuery
         * @memberof pb.QuotesFutureService
         * @instance
         * @param {pb.ICmdQuoteQueryFuture} request CmdQuoteQueryFuture message or plain object
         * @param {pb.QuotesFutureService.QuotesQueryCallback} callback Node-style callback called with the error, if any, and QuotesFuture
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(QuotesFutureService.prototype.quotesQuery = function quotesQuery(request, callback) {
            return this.rpcCall(quotesQuery, $root.pb.CmdQuoteQueryFuture, $root.pb.QuotesFuture, request, callback);
        }, "name", { value: "QuotesQuery" });

        /**
         * Calls QuotesQuery.
         * @function quotesQuery
         * @memberof pb.QuotesFutureService
         * @instance
         * @param {pb.ICmdQuoteQueryFuture} request CmdQuoteQueryFuture message or plain object
         * @returns {Promise<pb.QuotesFuture>} Promise
         * @variation 2
         */

        return QuotesFutureService;
    })();

    /**
     * LoginType enum.
     * @name pb.LoginType
     * @enum {number}
     * @property {number} LoginType_NULL=0 LoginType_NULL value
     * @property {number} MobilePhoneId=1 MobilePhoneId value
     * @property {number} WeChat=2 WeChat value
     * @property {number} QQ=3 QQ value
     * @property {number} WebTest=99 WebTest value
     */
    pb.LoginType = (function () {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "LoginType_NULL"] = 0;
        values[valuesById[1] = "MobilePhoneId"] = 1;
        values[valuesById[2] = "WeChat"] = 2;
        values[valuesById[3] = "QQ"] = 3;
        values[valuesById[99] = "WebTest"] = 99;
        return values;
    })();

    pb.CmdRegistry = (function () {

        /**
         * Properties of a CmdRegistry.
         * @memberof pb
         * @interface ICmdRegistry
         * @property {string|null} [account] CmdRegistry account
         * @property {pb.LoginType|null} [type] CmdRegistry type
         * @property {string|null} [pwd] CmdRegistry pwd
         * @property {string|null} [sms] CmdRegistry sms
         * @property {pb.AppFrom|null} [from] CmdRegistry from
         */

        /**
         * Constructs a new CmdRegistry.
         * @memberof pb
         * @classdesc Represents a CmdRegistry.
         * @implements ICmdRegistry
         * @constructor
         * @param {pb.ICmdRegistry=} [properties] Properties to set
         */
        function CmdRegistry(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdRegistry account.
         * @member {string} account
         * @memberof pb.CmdRegistry
         * @instance
         */
        CmdRegistry.prototype.account = "";

        /**
         * CmdRegistry type.
         * @member {pb.LoginType} type
         * @memberof pb.CmdRegistry
         * @instance
         */
        CmdRegistry.prototype.type = 0;

        /**
         * CmdRegistry pwd.
         * @member {string} pwd
         * @memberof pb.CmdRegistry
         * @instance
         */
        CmdRegistry.prototype.pwd = "";

        /**
         * CmdRegistry sms.
         * @member {string} sms
         * @memberof pb.CmdRegistry
         * @instance
         */
        CmdRegistry.prototype.sms = "";

        /**
         * CmdRegistry from.
         * @member {pb.AppFrom} from
         * @memberof pb.CmdRegistry
         * @instance
         */
        CmdRegistry.prototype.from = 0;

        /**
         * Creates a new CmdRegistry instance using the specified properties.
         * @function create
         * @memberof pb.CmdRegistry
         * @static
         * @param {pb.ICmdRegistry=} [properties] Properties to set
         * @returns {pb.CmdRegistry} CmdRegistry instance
         */
        CmdRegistry.create = function create(properties) {
            return new CmdRegistry(properties);
        };

        /**
         * Encodes the specified CmdRegistry message. Does not implicitly {@link pb.CmdRegistry.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdRegistry
         * @static
         * @param {pb.ICmdRegistry} message CmdRegistry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdRegistry.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.pwd != null && Object.hasOwnProperty.call(message, "pwd"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.pwd);
            if (message.sms != null && Object.hasOwnProperty.call(message, "sms"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.sms);
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 5, wireType 0 =*/40).int32(message.from);
            return writer;
        };

        /**
         * Encodes the specified CmdRegistry message, length delimited. Does not implicitly {@link pb.CmdRegistry.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdRegistry
         * @static
         * @param {pb.ICmdRegistry} message CmdRegistry message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdRegistry.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdRegistry message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdRegistry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdRegistry} CmdRegistry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdRegistry.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdRegistry();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.pwd = reader.string();
                        break;
                    case 4:
                        message.sms = reader.string();
                        break;
                    case 5:
                        message.from = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdRegistry message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdRegistry
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdRegistry} CmdRegistry
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdRegistry.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdRegistry message.
         * @function verify
         * @memberof pb.CmdRegistry
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdRegistry.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 99:
                        break;
                }
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.sms != null && message.hasOwnProperty("sms"))
                if (!$util.isString(message.sms))
                    return "sms: string expected";
            if (message.from != null && message.hasOwnProperty("from"))
                switch (message.from) {
                    default:
                        return "from: enum value expected";
                    case 0:
                    case 1:
                    case 201:
                    case 204:
                    case 205:
                    case 206:
                    case 208:
                    case 209:
                    case 210:
                    case 211:
                    case 212:
                    case 301:
                    case 302:
                    case 601:
                    case 1000:
                    case 1204:
                    case 1205:
                    case 1208:
                    case 1212:
                    case 6666:
                    case 6667:
                    case 7777:
                    case 7778:
                    case 8888:
                        break;
                }
            return null;
        };

        /**
         * Creates a CmdRegistry message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdRegistry
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdRegistry} CmdRegistry
         */
        CmdRegistry.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdRegistry)
                return object;
            var message = new $root.pb.CmdRegistry();
            if (object.account != null)
                message.account = String(object.account);
            switch (object.type) {
                case "LoginType_NULL":
                case 0:
                    message.type = 0;
                    break;
                case "MobilePhoneId":
                case 1:
                    message.type = 1;
                    break;
                case "WeChat":
                case 2:
                    message.type = 2;
                    break;
                case "QQ":
                case 3:
                    message.type = 3;
                    break;
                case "WebTest":
                case 99:
                    message.type = 99;
                    break;
            }
            if (object.pwd != null)
                message.pwd = String(object.pwd);
            if (object.sms != null)
                message.sms = String(object.sms);
            switch (object.from) {
                case "Android_000":
                case 0:
                    message.from = 0;
                    break;
                case "Android_001":
                case 1:
                    message.from = 1;
                    break;
                case "Android_201":
                case 201:
                    message.from = 201;
                    break;
                case "Android_204":
                case 204:
                    message.from = 204;
                    break;
                case "Android_205":
                case 205:
                    message.from = 205;
                    break;
                case "Android_206":
                case 206:
                    message.from = 206;
                    break;
                case "Android_208":
                case 208:
                    message.from = 208;
                    break;
                case "Android_209":
                case 209:
                    message.from = 209;
                    break;
                case "Android_210":
                case 210:
                    message.from = 210;
                    break;
                case "Android_211":
                case 211:
                    message.from = 211;
                    break;
                case "Android_212":
                case 212:
                    message.from = 212;
                    break;
                case "Android_301":
                case 301:
                    message.from = 301;
                    break;
                case "Android_302":
                case 302:
                    message.from = 302;
                    break;
                case "Android_601":
                case 601:
                    message.from = 601;
                    break;
                case "Android_1000":
                case 1000:
                    message.from = 1000;
                    break;
                case "Android_1204":
                case 1204:
                    message.from = 1204;
                    break;
                case "Android_1205":
                case 1205:
                    message.from = 1205;
                    break;
                case "Android_1208":
                case 1208:
                    message.from = 1208;
                    break;
                case "Android_1212":
                case 1212:
                    message.from = 1212;
                    break;
                case "IosAppleStore":
                case 6666:
                    message.from = 6666;
                    break;
                case "Ipad":
                case 6667:
                    message.from = 6667;
                    break;
                case "WebsiteIos":
                case 7777:
                    message.from = 7777;
                    break;
                case "WebsiteAndriod":
                case 7778:
                    message.from = 7778;
                    break;
                case "WeChatMinProgram":
                case 8888:
                    message.from = 8888;
                    break;
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdRegistry message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdRegistry
         * @static
         * @param {pb.CmdRegistry} message CmdRegistry
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdRegistry.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.type = options.enums === String ? "LoginType_NULL" : 0;
                object.pwd = "";
                object.sms = "";
                object.from = options.enums === String ? "Android_000" : 0;
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.pb.LoginType[message.type] : message.type;
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                object.pwd = message.pwd;
            if (message.sms != null && message.hasOwnProperty("sms"))
                object.sms = message.sms;
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = options.enums === String ? $root.pb.AppFrom[message.from] : message.from;
            return object;
        };

        /**
         * Converts this CmdRegistry to JSON.
         * @function toJSON
         * @memberof pb.CmdRegistry
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdRegistry.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdRegistry;
    })();

    pb.CmdLogin = (function () {

        /**
         * Properties of a CmdLogin.
         * @memberof pb
         * @interface ICmdLogin
         * @property {string|null} [account] CmdLogin account
         * @property {pb.LoginType|null} [type] CmdLogin type
         * @property {string|null} [pwd] CmdLogin pwd
         * @property {pb.AppFrom|null} [from] CmdLogin from
         */

        /**
         * Constructs a new CmdLogin.
         * @memberof pb
         * @classdesc Represents a CmdLogin.
         * @implements ICmdLogin
         * @constructor
         * @param {pb.ICmdLogin=} [properties] Properties to set
         */
        function CmdLogin(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdLogin account.
         * @member {string} account
         * @memberof pb.CmdLogin
         * @instance
         */
        CmdLogin.prototype.account = "";

        /**
         * CmdLogin type.
         * @member {pb.LoginType} type
         * @memberof pb.CmdLogin
         * @instance
         */
        CmdLogin.prototype.type = 0;

        /**
         * CmdLogin pwd.
         * @member {string} pwd
         * @memberof pb.CmdLogin
         * @instance
         */
        CmdLogin.prototype.pwd = "";

        /**
         * CmdLogin from.
         * @member {pb.AppFrom} from
         * @memberof pb.CmdLogin
         * @instance
         */
        CmdLogin.prototype.from = 0;

        /**
         * Creates a new CmdLogin instance using the specified properties.
         * @function create
         * @memberof pb.CmdLogin
         * @static
         * @param {pb.ICmdLogin=} [properties] Properties to set
         * @returns {pb.CmdLogin} CmdLogin instance
         */
        CmdLogin.create = function create(properties) {
            return new CmdLogin(properties);
        };

        /**
         * Encodes the specified CmdLogin message. Does not implicitly {@link pb.CmdLogin.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdLogin
         * @static
         * @param {pb.ICmdLogin} message CmdLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdLogin.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            if (message.type != null && Object.hasOwnProperty.call(message, "type"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.type);
            if (message.pwd != null && Object.hasOwnProperty.call(message, "pwd"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.pwd);
            if (message.from != null && Object.hasOwnProperty.call(message, "from"))
                writer.uint32(/* id 4, wireType 0 =*/32).int32(message.from);
            return writer;
        };

        /**
         * Encodes the specified CmdLogin message, length delimited. Does not implicitly {@link pb.CmdLogin.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdLogin
         * @static
         * @param {pb.ICmdLogin} message CmdLogin message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdLogin.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdLogin message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdLogin} CmdLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdLogin.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdLogin();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.type = reader.int32();
                        break;
                    case 3:
                        message.pwd = reader.string();
                        break;
                    case 4:
                        message.from = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdLogin message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdLogin
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdLogin} CmdLogin
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdLogin.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdLogin message.
         * @function verify
         * @memberof pb.CmdLogin
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdLogin.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.type != null && message.hasOwnProperty("type"))
                switch (message.type) {
                    default:
                        return "type: enum value expected";
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 99:
                        break;
                }
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.from != null && message.hasOwnProperty("from"))
                switch (message.from) {
                    default:
                        return "from: enum value expected";
                    case 0:
                    case 1:
                    case 201:
                    case 204:
                    case 205:
                    case 206:
                    case 208:
                    case 209:
                    case 210:
                    case 211:
                    case 212:
                    case 301:
                    case 302:
                    case 601:
                    case 1000:
                    case 1204:
                    case 1205:
                    case 1208:
                    case 1212:
                    case 6666:
                    case 6667:
                    case 7777:
                    case 7778:
                    case 8888:
                        break;
                }
            return null;
        };

        /**
         * Creates a CmdLogin message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdLogin
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdLogin} CmdLogin
         */
        CmdLogin.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdLogin)
                return object;
            var message = new $root.pb.CmdLogin();
            if (object.account != null)
                message.account = String(object.account);
            switch (object.type) {
                case "LoginType_NULL":
                case 0:
                    message.type = 0;
                    break;
                case "MobilePhoneId":
                case 1:
                    message.type = 1;
                    break;
                case "WeChat":
                case 2:
                    message.type = 2;
                    break;
                case "QQ":
                case 3:
                    message.type = 3;
                    break;
                case "WebTest":
                case 99:
                    message.type = 99;
                    break;
            }
            if (object.pwd != null)
                message.pwd = String(object.pwd);
            switch (object.from) {
                case "Android_000":
                case 0:
                    message.from = 0;
                    break;
                case "Android_001":
                case 1:
                    message.from = 1;
                    break;
                case "Android_201":
                case 201:
                    message.from = 201;
                    break;
                case "Android_204":
                case 204:
                    message.from = 204;
                    break;
                case "Android_205":
                case 205:
                    message.from = 205;
                    break;
                case "Android_206":
                case 206:
                    message.from = 206;
                    break;
                case "Android_208":
                case 208:
                    message.from = 208;
                    break;
                case "Android_209":
                case 209:
                    message.from = 209;
                    break;
                case "Android_210":
                case 210:
                    message.from = 210;
                    break;
                case "Android_211":
                case 211:
                    message.from = 211;
                    break;
                case "Android_212":
                case 212:
                    message.from = 212;
                    break;
                case "Android_301":
                case 301:
                    message.from = 301;
                    break;
                case "Android_302":
                case 302:
                    message.from = 302;
                    break;
                case "Android_601":
                case 601:
                    message.from = 601;
                    break;
                case "Android_1000":
                case 1000:
                    message.from = 1000;
                    break;
                case "Android_1204":
                case 1204:
                    message.from = 1204;
                    break;
                case "Android_1205":
                case 1205:
                    message.from = 1205;
                    break;
                case "Android_1208":
                case 1208:
                    message.from = 1208;
                    break;
                case "Android_1212":
                case 1212:
                    message.from = 1212;
                    break;
                case "IosAppleStore":
                case 6666:
                    message.from = 6666;
                    break;
                case "Ipad":
                case 6667:
                    message.from = 6667;
                    break;
                case "WebsiteIos":
                case 7777:
                    message.from = 7777;
                    break;
                case "WebsiteAndriod":
                case 7778:
                    message.from = 7778;
                    break;
                case "WeChatMinProgram":
                case 8888:
                    message.from = 8888;
                    break;
            }
            return message;
        };

        /**
         * Creates a plain object from a CmdLogin message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdLogin
         * @static
         * @param {pb.CmdLogin} message CmdLogin
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdLogin.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.type = options.enums === String ? "LoginType_NULL" : 0;
                object.pwd = "";
                object.from = options.enums === String ? "Android_000" : 0;
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.type != null && message.hasOwnProperty("type"))
                object.type = options.enums === String ? $root.pb.LoginType[message.type] : message.type;
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                object.pwd = message.pwd;
            if (message.from != null && message.hasOwnProperty("from"))
                object.from = options.enums === String ? $root.pb.AppFrom[message.from] : message.from;
            return object;
        };

        /**
         * Converts this CmdLogin to JSON.
         * @function toJSON
         * @memberof pb.CmdLogin
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdLogin.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdLogin;
    })();

    pb.CmdLoginReply = (function () {

        /**
         * Properties of a CmdLoginReply.
         * @memberof pb
         * @interface ICmdLoginReply
         * @property {pb.IErrorInfo|null} [err] CmdLoginReply err
         * @property {number|null} [uid] CmdLoginReply uid
         * @property {string|null} [token] CmdLoginReply token
         * @property {string|null} [gameAddr] CmdLoginReply gameAddr
         */

        /**
         * Constructs a new CmdLoginReply.
         * @memberof pb
         * @classdesc Represents a CmdLoginReply.
         * @implements ICmdLoginReply
         * @constructor
         * @param {pb.ICmdLoginReply=} [properties] Properties to set
         */
        function CmdLoginReply(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdLoginReply err.
         * @member {pb.IErrorInfo|null|undefined} err
         * @memberof pb.CmdLoginReply
         * @instance
         */
        CmdLoginReply.prototype.err = null;

        /**
         * CmdLoginReply uid.
         * @member {number} uid
         * @memberof pb.CmdLoginReply
         * @instance
         */
        CmdLoginReply.prototype.uid = 0;

        /**
         * CmdLoginReply token.
         * @member {string} token
         * @memberof pb.CmdLoginReply
         * @instance
         */
        CmdLoginReply.prototype.token = "";

        /**
         * CmdLoginReply gameAddr.
         * @member {string} gameAddr
         * @memberof pb.CmdLoginReply
         * @instance
         */
        CmdLoginReply.prototype.gameAddr = "";

        /**
         * Creates a new CmdLoginReply instance using the specified properties.
         * @function create
         * @memberof pb.CmdLoginReply
         * @static
         * @param {pb.ICmdLoginReply=} [properties] Properties to set
         * @returns {pb.CmdLoginReply} CmdLoginReply instance
         */
        CmdLoginReply.create = function create(properties) {
            return new CmdLoginReply(properties);
        };

        /**
         * Encodes the specified CmdLoginReply message. Does not implicitly {@link pb.CmdLoginReply.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdLoginReply
         * @static
         * @param {pb.ICmdLoginReply} message CmdLoginReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdLoginReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                $root.pb.ErrorInfo.encode(message.err, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.uid != null && Object.hasOwnProperty.call(message, "uid"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.uid);
            if (message.token != null && Object.hasOwnProperty.call(message, "token"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.token);
            if (message.gameAddr != null && Object.hasOwnProperty.call(message, "gameAddr"))
                writer.uint32(/* id 4, wireType 2 =*/34).string(message.gameAddr);
            return writer;
        };

        /**
         * Encodes the specified CmdLoginReply message, length delimited. Does not implicitly {@link pb.CmdLoginReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdLoginReply
         * @static
         * @param {pb.ICmdLoginReply} message CmdLoginReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdLoginReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdLoginReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdLoginReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdLoginReply} CmdLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdLoginReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdLoginReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.err = $root.pb.ErrorInfo.decode(reader, reader.uint32());
                        break;
                    case 2:
                        message.uid = reader.int32();
                        break;
                    case 3:
                        message.token = reader.string();
                        break;
                    case 4:
                        message.gameAddr = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdLoginReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdLoginReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdLoginReply} CmdLoginReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdLoginReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdLoginReply message.
         * @function verify
         * @memberof pb.CmdLoginReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdLoginReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.err != null && message.hasOwnProperty("err")) {
                var error = $root.pb.ErrorInfo.verify(message.err);
                if (error)
                    return "err." + error;
            }
            if (message.uid != null && message.hasOwnProperty("uid"))
                if (!$util.isInteger(message.uid))
                    return "uid: integer expected";
            if (message.token != null && message.hasOwnProperty("token"))
                if (!$util.isString(message.token))
                    return "token: string expected";
            if (message.gameAddr != null && message.hasOwnProperty("gameAddr"))
                if (!$util.isString(message.gameAddr))
                    return "gameAddr: string expected";
            return null;
        };

        /**
         * Creates a CmdLoginReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdLoginReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdLoginReply} CmdLoginReply
         */
        CmdLoginReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdLoginReply)
                return object;
            var message = new $root.pb.CmdLoginReply();
            if (object.err != null) {
                if (typeof object.err !== "object")
                    throw TypeError(".pb.CmdLoginReply.err: object expected");
                message.err = $root.pb.ErrorInfo.fromObject(object.err);
            }
            if (object.uid != null)
                message.uid = object.uid | 0;
            if (object.token != null)
                message.token = String(object.token);
            if (object.gameAddr != null)
                message.gameAddr = String(object.gameAddr);
            return message;
        };

        /**
         * Creates a plain object from a CmdLoginReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdLoginReply
         * @static
         * @param {pb.CmdLoginReply} message CmdLoginReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdLoginReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.err = null;
                object.uid = 0;
                object.token = "";
                object.gameAddr = "";
            }
            if (message.err != null && message.hasOwnProperty("err"))
                object.err = $root.pb.ErrorInfo.toObject(message.err, options);
            if (message.uid != null && message.hasOwnProperty("uid"))
                object.uid = message.uid;
            if (message.token != null && message.hasOwnProperty("token"))
                object.token = message.token;
            if (message.gameAddr != null && message.hasOwnProperty("gameAddr"))
                object.gameAddr = message.gameAddr;
            return object;
        };

        /**
         * Converts this CmdLoginReply to JSON.
         * @function toJSON
         * @memberof pb.CmdLoginReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdLoginReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdLoginReply;
    })();

    pb.CmdGetCaptcha = (function () {

        /**
         * Properties of a CmdGetCaptcha.
         * @memberof pb
         * @interface ICmdGetCaptcha
         * @property {string|null} [account] CmdGetCaptcha account
         */

        /**
         * Constructs a new CmdGetCaptcha.
         * @memberof pb
         * @classdesc Represents a CmdGetCaptcha.
         * @implements ICmdGetCaptcha
         * @constructor
         * @param {pb.ICmdGetCaptcha=} [properties] Properties to set
         */
        function CmdGetCaptcha(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGetCaptcha account.
         * @member {string} account
         * @memberof pb.CmdGetCaptcha
         * @instance
         */
        CmdGetCaptcha.prototype.account = "";

        /**
         * Creates a new CmdGetCaptcha instance using the specified properties.
         * @function create
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {pb.ICmdGetCaptcha=} [properties] Properties to set
         * @returns {pb.CmdGetCaptcha} CmdGetCaptcha instance
         */
        CmdGetCaptcha.create = function create(properties) {
            return new CmdGetCaptcha(properties);
        };

        /**
         * Encodes the specified CmdGetCaptcha message. Does not implicitly {@link pb.CmdGetCaptcha.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {pb.ICmdGetCaptcha} message CmdGetCaptcha message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetCaptcha.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            return writer;
        };

        /**
         * Encodes the specified CmdGetCaptcha message, length delimited. Does not implicitly {@link pb.CmdGetCaptcha.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {pb.ICmdGetCaptcha} message CmdGetCaptcha message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetCaptcha.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGetCaptcha message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGetCaptcha} CmdGetCaptcha
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetCaptcha.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGetCaptcha();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGetCaptcha message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGetCaptcha} CmdGetCaptcha
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetCaptcha.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGetCaptcha message.
         * @function verify
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGetCaptcha.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            return null;
        };

        /**
         * Creates a CmdGetCaptcha message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGetCaptcha} CmdGetCaptcha
         */
        CmdGetCaptcha.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGetCaptcha)
                return object;
            var message = new $root.pb.CmdGetCaptcha();
            if (object.account != null)
                message.account = String(object.account);
            return message;
        };

        /**
         * Creates a plain object from a CmdGetCaptcha message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGetCaptcha
         * @static
         * @param {pb.CmdGetCaptcha} message CmdGetCaptcha
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGetCaptcha.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                object.account = "";
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            return object;
        };

        /**
         * Converts this CmdGetCaptcha to JSON.
         * @function toJSON
         * @memberof pb.CmdGetCaptcha
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGetCaptcha.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGetCaptcha;
    })();

    pb.CmdGetCaptchaReply = (function () {

        /**
         * Properties of a CmdGetCaptchaReply.
         * @memberof pb
         * @interface ICmdGetCaptchaReply
         * @property {Uint8Array|null} [captcha] CmdGetCaptchaReply captcha
         */

        /**
         * Constructs a new CmdGetCaptchaReply.
         * @memberof pb
         * @classdesc Represents a CmdGetCaptchaReply.
         * @implements ICmdGetCaptchaReply
         * @constructor
         * @param {pb.ICmdGetCaptchaReply=} [properties] Properties to set
         */
        function CmdGetCaptchaReply(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGetCaptchaReply captcha.
         * @member {Uint8Array} captcha
         * @memberof pb.CmdGetCaptchaReply
         * @instance
         */
        CmdGetCaptchaReply.prototype.captcha = $util.newBuffer([]);

        /**
         * Creates a new CmdGetCaptchaReply instance using the specified properties.
         * @function create
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {pb.ICmdGetCaptchaReply=} [properties] Properties to set
         * @returns {pb.CmdGetCaptchaReply} CmdGetCaptchaReply instance
         */
        CmdGetCaptchaReply.create = function create(properties) {
            return new CmdGetCaptchaReply(properties);
        };

        /**
         * Encodes the specified CmdGetCaptchaReply message. Does not implicitly {@link pb.CmdGetCaptchaReply.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {pb.ICmdGetCaptchaReply} message CmdGetCaptchaReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetCaptchaReply.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.captcha != null && Object.hasOwnProperty.call(message, "captcha"))
                writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.captcha);
            return writer;
        };

        /**
         * Encodes the specified CmdGetCaptchaReply message, length delimited. Does not implicitly {@link pb.CmdGetCaptchaReply.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {pb.ICmdGetCaptchaReply} message CmdGetCaptchaReply message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetCaptchaReply.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGetCaptchaReply message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGetCaptchaReply} CmdGetCaptchaReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetCaptchaReply.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGetCaptchaReply();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.captcha = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGetCaptchaReply message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGetCaptchaReply} CmdGetCaptchaReply
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetCaptchaReply.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGetCaptchaReply message.
         * @function verify
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGetCaptchaReply.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.captcha != null && message.hasOwnProperty("captcha"))
                if (!(message.captcha && typeof message.captcha.length === "number" || $util.isString(message.captcha)))
                    return "captcha: buffer expected";
            return null;
        };

        /**
         * Creates a CmdGetCaptchaReply message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGetCaptchaReply} CmdGetCaptchaReply
         */
        CmdGetCaptchaReply.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGetCaptchaReply)
                return object;
            var message = new $root.pb.CmdGetCaptchaReply();
            if (object.captcha != null)
                if (typeof object.captcha === "string")
                    $util.base64.decode(object.captcha, message.captcha = $util.newBuffer($util.base64.length(object.captcha)), 0);
                else if (object.captcha.length)
                    message.captcha = object.captcha;
            return message;
        };

        /**
         * Creates a plain object from a CmdGetCaptchaReply message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGetCaptchaReply
         * @static
         * @param {pb.CmdGetCaptchaReply} message CmdGetCaptchaReply
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGetCaptchaReply.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults)
                if (options.bytes === String)
                    object.captcha = "";
                else {
                    object.captcha = [];
                    if (options.bytes !== Array)
                        object.captcha = $util.newBuffer(object.captcha);
                }
            if (message.captcha != null && message.hasOwnProperty("captcha"))
                object.captcha = options.bytes === String ? $util.base64.encode(message.captcha, 0, message.captcha.length) : options.bytes === Array ? Array.prototype.slice.call(message.captcha) : message.captcha;
            return object;
        };

        /**
         * Converts this CmdGetCaptchaReply to JSON.
         * @function toJSON
         * @memberof pb.CmdGetCaptchaReply
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGetCaptchaReply.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGetCaptchaReply;
    })();

    pb.CmdGetSms = (function () {

        /**
         * Properties of a CmdGetSms.
         * @memberof pb
         * @interface ICmdGetSms
         * @property {string|null} [account] CmdGetSms account
         * @property {string|null} [captcha] CmdGetSms captcha
         */

        /**
         * Constructs a new CmdGetSms.
         * @memberof pb
         * @classdesc Represents a CmdGetSms.
         * @implements ICmdGetSms
         * @constructor
         * @param {pb.ICmdGetSms=} [properties] Properties to set
         */
        function CmdGetSms(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdGetSms account.
         * @member {string} account
         * @memberof pb.CmdGetSms
         * @instance
         */
        CmdGetSms.prototype.account = "";

        /**
         * CmdGetSms captcha.
         * @member {string} captcha
         * @memberof pb.CmdGetSms
         * @instance
         */
        CmdGetSms.prototype.captcha = "";

        /**
         * Creates a new CmdGetSms instance using the specified properties.
         * @function create
         * @memberof pb.CmdGetSms
         * @static
         * @param {pb.ICmdGetSms=} [properties] Properties to set
         * @returns {pb.CmdGetSms} CmdGetSms instance
         */
        CmdGetSms.create = function create(properties) {
            return new CmdGetSms(properties);
        };

        /**
         * Encodes the specified CmdGetSms message. Does not implicitly {@link pb.CmdGetSms.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdGetSms
         * @static
         * @param {pb.ICmdGetSms} message CmdGetSms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetSms.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            if (message.captcha != null && Object.hasOwnProperty.call(message, "captcha"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.captcha);
            return writer;
        };

        /**
         * Encodes the specified CmdGetSms message, length delimited. Does not implicitly {@link pb.CmdGetSms.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdGetSms
         * @static
         * @param {pb.ICmdGetSms} message CmdGetSms message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdGetSms.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdGetSms message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdGetSms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdGetSms} CmdGetSms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetSms.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdGetSms();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.captcha = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdGetSms message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdGetSms
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdGetSms} CmdGetSms
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdGetSms.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdGetSms message.
         * @function verify
         * @memberof pb.CmdGetSms
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdGetSms.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.captcha != null && message.hasOwnProperty("captcha"))
                if (!$util.isString(message.captcha))
                    return "captcha: string expected";
            return null;
        };

        /**
         * Creates a CmdGetSms message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdGetSms
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdGetSms} CmdGetSms
         */
        CmdGetSms.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdGetSms)
                return object;
            var message = new $root.pb.CmdGetSms();
            if (object.account != null)
                message.account = String(object.account);
            if (object.captcha != null)
                message.captcha = String(object.captcha);
            return message;
        };

        /**
         * Creates a plain object from a CmdGetSms message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdGetSms
         * @static
         * @param {pb.CmdGetSms} message CmdGetSms
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdGetSms.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.captcha = "";
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.captcha != null && message.hasOwnProperty("captcha"))
                object.captcha = message.captcha;
            return object;
        };

        /**
         * Converts this CmdGetSms to JSON.
         * @function toJSON
         * @memberof pb.CmdGetSms
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdGetSms.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdGetSms;
    })();

    pb.CmdResetPwd = (function () {

        /**
         * Properties of a CmdResetPwd.
         * @memberof pb
         * @interface ICmdResetPwd
         * @property {string|null} [account] CmdResetPwd account
         * @property {string|null} [pwd] CmdResetPwd pwd
         * @property {string|null} [captcha] CmdResetPwd captcha
         */

        /**
         * Constructs a new CmdResetPwd.
         * @memberof pb
         * @classdesc Represents a CmdResetPwd.
         * @implements ICmdResetPwd
         * @constructor
         * @param {pb.ICmdResetPwd=} [properties] Properties to set
         */
        function CmdResetPwd(properties) {
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * CmdResetPwd account.
         * @member {string} account
         * @memberof pb.CmdResetPwd
         * @instance
         */
        CmdResetPwd.prototype.account = "";

        /**
         * CmdResetPwd pwd.
         * @member {string} pwd
         * @memberof pb.CmdResetPwd
         * @instance
         */
        CmdResetPwd.prototype.pwd = "";

        /**
         * CmdResetPwd captcha.
         * @member {string} captcha
         * @memberof pb.CmdResetPwd
         * @instance
         */
        CmdResetPwd.prototype.captcha = "";

        /**
         * Creates a new CmdResetPwd instance using the specified properties.
         * @function create
         * @memberof pb.CmdResetPwd
         * @static
         * @param {pb.ICmdResetPwd=} [properties] Properties to set
         * @returns {pb.CmdResetPwd} CmdResetPwd instance
         */
        CmdResetPwd.create = function create(properties) {
            return new CmdResetPwd(properties);
        };

        /**
         * Encodes the specified CmdResetPwd message. Does not implicitly {@link pb.CmdResetPwd.verify|verify} messages.
         * @function encode
         * @memberof pb.CmdResetPwd
         * @static
         * @param {pb.ICmdResetPwd} message CmdResetPwd message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdResetPwd.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.account != null && Object.hasOwnProperty.call(message, "account"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.account);
            if (message.pwd != null && Object.hasOwnProperty.call(message, "pwd"))
                writer.uint32(/* id 2, wireType 2 =*/18).string(message.pwd);
            if (message.captcha != null && Object.hasOwnProperty.call(message, "captcha"))
                writer.uint32(/* id 3, wireType 2 =*/26).string(message.captcha);
            return writer;
        };

        /**
         * Encodes the specified CmdResetPwd message, length delimited. Does not implicitly {@link pb.CmdResetPwd.verify|verify} messages.
         * @function encodeDelimited
         * @memberof pb.CmdResetPwd
         * @static
         * @param {pb.ICmdResetPwd} message CmdResetPwd message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        CmdResetPwd.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a CmdResetPwd message from the specified reader or buffer.
         * @function decode
         * @memberof pb.CmdResetPwd
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {pb.CmdResetPwd} CmdResetPwd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdResetPwd.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.pb.CmdResetPwd();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                    case 1:
                        message.account = reader.string();
                        break;
                    case 2:
                        message.pwd = reader.string();
                        break;
                    case 3:
                        message.captcha = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                }
            }
            return message;
        };

        /**
         * Decodes a CmdResetPwd message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof pb.CmdResetPwd
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {pb.CmdResetPwd} CmdResetPwd
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        CmdResetPwd.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a CmdResetPwd message.
         * @function verify
         * @memberof pb.CmdResetPwd
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        CmdResetPwd.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.account != null && message.hasOwnProperty("account"))
                if (!$util.isString(message.account))
                    return "account: string expected";
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                if (!$util.isString(message.pwd))
                    return "pwd: string expected";
            if (message.captcha != null && message.hasOwnProperty("captcha"))
                if (!$util.isString(message.captcha))
                    return "captcha: string expected";
            return null;
        };

        /**
         * Creates a CmdResetPwd message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof pb.CmdResetPwd
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {pb.CmdResetPwd} CmdResetPwd
         */
        CmdResetPwd.fromObject = function fromObject(object) {
            if (object instanceof $root.pb.CmdResetPwd)
                return object;
            var message = new $root.pb.CmdResetPwd();
            if (object.account != null)
                message.account = String(object.account);
            if (object.pwd != null)
                message.pwd = String(object.pwd);
            if (object.captcha != null)
                message.captcha = String(object.captcha);
            return message;
        };

        /**
         * Creates a plain object from a CmdResetPwd message. Also converts values to other types if specified.
         * @function toObject
         * @memberof pb.CmdResetPwd
         * @static
         * @param {pb.CmdResetPwd} message CmdResetPwd
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        CmdResetPwd.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.defaults) {
                object.account = "";
                object.pwd = "";
                object.captcha = "";
            }
            if (message.account != null && message.hasOwnProperty("account"))
                object.account = message.account;
            if (message.pwd != null && message.hasOwnProperty("pwd"))
                object.pwd = message.pwd;
            if (message.captcha != null && message.hasOwnProperty("captcha"))
                object.captcha = message.captcha;
            return object;
        };

        /**
         * Converts this CmdResetPwd to JSON.
         * @function toJSON
         * @memberof pb.CmdResetPwd
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        CmdResetPwd.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        return CmdResetPwd;
    })();

    pb.LoginService = (function () {

        /**
         * Constructs a new LoginService service.
         * @memberof pb
         * @classdesc Represents a LoginService
         * @extends $protobuf.rpc.Service
         * @constructor
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         */
        function LoginService(rpcImpl, requestDelimited, responseDelimited) {
            $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
        }

        (LoginService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = LoginService;

        /**
         * Creates new LoginService service using the specified rpc implementation.
         * @function create
         * @memberof pb.LoginService
         * @static
         * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
         * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
         * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
         * @returns {LoginService} RPC service. Useful where requests and/or responses are streamed.
         */
        LoginService.create = function create(rpcImpl, requestDelimited, responseDelimited) {
            return new this(rpcImpl, requestDelimited, responseDelimited);
        };

        /**
         * Callback as used by {@link pb.LoginService#registry}.
         * @memberof pb.LoginService
         * @typedef RegistryCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.ErrorInfo} [response] ErrorInfo
         */

        /**
         * Calls Registry.
         * @function registry
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdRegistry} request CmdRegistry message or plain object
         * @param {pb.LoginService.RegistryCallback} callback Node-style callback called with the error, if any, and ErrorInfo
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(LoginService.prototype.registry = function registry(request, callback) {
            return this.rpcCall(registry, $root.pb.CmdRegistry, $root.pb.ErrorInfo, request, callback);
        }, "name", { value: "Registry" });

        /**
         * Calls Registry.
         * @function registry
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdRegistry} request CmdRegistry message or plain object
         * @returns {Promise<pb.ErrorInfo>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.LoginService#login}.
         * @memberof pb.LoginService
         * @typedef LoginCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.CmdLoginReply} [response] CmdLoginReply
         */

        /**
         * Calls Login.
         * @function login
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdLogin} request CmdLogin message or plain object
         * @param {pb.LoginService.LoginCallback} callback Node-style callback called with the error, if any, and CmdLoginReply
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(LoginService.prototype.login = function login(request, callback) {
            return this.rpcCall(login, $root.pb.CmdLogin, $root.pb.CmdLoginReply, request, callback);
        }, "name", { value: "Login" });

        /**
         * Calls Login.
         * @function login
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdLogin} request CmdLogin message or plain object
         * @returns {Promise<pb.CmdLoginReply>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.LoginService#getCaptcha}.
         * @memberof pb.LoginService
         * @typedef GetCaptchaCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.CmdGetCaptchaReply} [response] CmdGetCaptchaReply
         */

        /**
         * Calls GetCaptcha.
         * @function getCaptcha
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdGetCaptcha} request CmdGetCaptcha message or plain object
         * @param {pb.LoginService.GetCaptchaCallback} callback Node-style callback called with the error, if any, and CmdGetCaptchaReply
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(LoginService.prototype.getCaptcha = function getCaptcha(request, callback) {
            return this.rpcCall(getCaptcha, $root.pb.CmdGetCaptcha, $root.pb.CmdGetCaptchaReply, request, callback);
        }, "name", { value: "GetCaptcha" });

        /**
         * Calls GetCaptcha.
         * @function getCaptcha
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdGetCaptcha} request CmdGetCaptcha message or plain object
         * @returns {Promise<pb.CmdGetCaptchaReply>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.LoginService#getSms}.
         * @memberof pb.LoginService
         * @typedef GetSmsCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.ErrorInfo} [response] ErrorInfo
         */

        /**
         * Calls GetSms.
         * @function getSms
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdGetSms} request CmdGetSms message or plain object
         * @param {pb.LoginService.GetSmsCallback} callback Node-style callback called with the error, if any, and ErrorInfo
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(LoginService.prototype.getSms = function getSms(request, callback) {
            return this.rpcCall(getSms, $root.pb.CmdGetSms, $root.pb.ErrorInfo, request, callback);
        }, "name", { value: "GetSms" });

        /**
         * Calls GetSms.
         * @function getSms
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdGetSms} request CmdGetSms message or plain object
         * @returns {Promise<pb.ErrorInfo>} Promise
         * @variation 2
         */

        /**
         * Callback as used by {@link pb.LoginService#resetPwd}.
         * @memberof pb.LoginService
         * @typedef ResetPwdCallback
         * @type {function}
         * @param {Error|null} error Error, if any
         * @param {pb.ErrorInfo} [response] ErrorInfo
         */

        /**
         * Calls ResetPwd.
         * @function resetPwd
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdResetPwd} request CmdResetPwd message or plain object
         * @param {pb.LoginService.ResetPwdCallback} callback Node-style callback called with the error, if any, and ErrorInfo
         * @returns {undefined}
         * @variation 1
         */
        Object.defineProperty(LoginService.prototype.resetPwd = function resetPwd(request, callback) {
            return this.rpcCall(resetPwd, $root.pb.CmdResetPwd, $root.pb.ErrorInfo, request, callback);
        }, "name", { value: "ResetPwd" });

        /**
         * Calls ResetPwd.
         * @function resetPwd
         * @memberof pb.LoginService
         * @instance
         * @param {pb.ICmdResetPwd} request CmdResetPwd message or plain object
         * @returns {Promise<pb.ErrorInfo>} Promise
         * @variation 2
         */

        return LoginService;
    })();

    return pb;
})();

module.exports = $root;
