/* eslint-disable @typescript-eslint/naming-convention */
import { fromBase64, toBase64, toUtf8 } from "@cosmjs/encoding";
import { AminoTypes, coins } from "@lbmjs/stargate";
import {
  MsgClearAdmin,
  MsgExecuteContract,
  MsgInstantiateContract,
  MsgMigrateContract,
  MsgStoreCode,
  MsgUpdateAdmin,
} from "lbmjs-types/lbm/wasm/v1/tx";
import Long from "long";

import {
  AminoMsgClearAdmin,
  AminoMsgExecuteContract,
  AminoMsgInstantiateContract,
  AminoMsgMigrateContract,
  AminoMsgStoreCode,
  AminoMsgUpdateAdmin,
  cosmWasmTypes,
} from "./aminotypes";

describe("AminoTypes", () => {
  describe("toAmino", () => {
    it("works for MsgStoreCode", () => {
      const msg: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        source: "",
        builder: "",
        instantiatePermission: undefined,
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/lbm.wasm.v1.MsgStoreCode",
        value: msg,
      });
      const expected: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgInstantiateContract", () => {
      // With admin
      {
        const msg: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          initMsg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "cony"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        };
        const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
          typeUrl: "/lbm.wasm.v1.MsgInstantiateContract",
          value: msg,
        });
        const expected: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            init_msg: toBase64(toUtf8(`{"foo":"bar"}`)),
            funds: coins(1234, "cony"),
            admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          },
        };
        expect(aminoMsg).toEqual(expected);
      }

      // Without admin
      {
        const msg: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          initMsg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "cony"),
          admin: "",
        };
        const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
          typeUrl: "/lbm.wasm.v1.MsgInstantiateContract",
          value: msg,
        });
        const expected: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            init_msg: toBase64(toUtf8(`{"foo":"bar"}`)),
            funds: coins(1234, "cony"),
            admin: undefined,
          },
        };
        expect(aminoMsg).toEqual(expected);
      }
    });

    it("works for MsgUpdateAdmin", () => {
      const msg: MsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/lbm.wasm.v1.MsgUpdateAdmin",
        value: msg,
      });
      const expected: AminoMsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgClearAdmin", () => {
      const msg: MsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/lbm.wasm.v1.MsgClearAdmin",
        value: msg,
      });
      const expected: AminoMsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgExecuteContract", () => {
      const msg: MsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toUtf8(`{"foo":"bar"}`),
        funds: coins(1234, "cony"),
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/lbm.wasm.v1.MsgExecuteContract",
        value: msg,
      });
      const expected: AminoMsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: toBase64(toUtf8(`{"foo":"bar"}`)),
          funds: coins(1234, "cony"),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });

    it("works for MsgMigrateContract", () => {
      const msg: MsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        migrateMsg: toUtf8(`{"foo":"bar"}`),
      };
      const aminoMsg = new AminoTypes({ additions: cosmWasmTypes }).toAmino({
        typeUrl: "/lbm.wasm.v1.MsgMigrateContract",
        value: msg,
      });
      const expected: AminoMsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          migrate_msg: toBase64(toUtf8(`{"foo":"bar"}`)),
        },
      };
      expect(aminoMsg).toEqual(expected);
    });
  });

  describe("fromAmino", () => {
    it("works for MsgStoreCode", () => {
      const aminoMsg: AminoMsgStoreCode = {
        type: "wasm/MsgStoreCode",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          wasm_byte_code: "WUVMTE9XIFNVQk1BUklORQ==",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgStoreCode = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        wasmByteCode: fromBase64("WUVMTE9XIFNVQk1BUklORQ=="),
        source: "",
        builder: "",
        instantiatePermission: undefined,
      };
      expect(msg).toEqual({
        typeUrl: "/lbm.wasm.v1.MsgStoreCode",
        value: expectedValue,
      });
    });

    it("works for MsgInstantiateContract", () => {
      // With admin
      {
        const aminoMsg: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            init_msg: toBase64(toUtf8(`{"foo":"bar"}`)),
            funds: coins(1234, "cony"),
            admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          },
        };
        const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
        const expectedValue: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          initMsg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "cony"),
          admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        };
        expect(msg).toEqual({
          typeUrl: "/lbm.wasm.v1.MsgInstantiateContract",
          value: expectedValue,
        });
      }

      // Without admin
      {
        const aminoMsg: AminoMsgInstantiateContract = {
          type: "wasm/MsgInstantiateContract",
          value: {
            sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
            code_id: "12345",
            label: "sticky",
            init_msg: toBase64(toUtf8(`{"foo":"bar"}`)),
            funds: coins(1234, "cony"),
          },
        };
        const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
        const expectedValue: MsgInstantiateContract = {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          codeId: Long.fromString("12345"),
          label: "sticky",
          initMsg: toUtf8(`{"foo":"bar"}`),
          funds: coins(1234, "cony"),
          admin: "",
        };
        expect(msg).toEqual({
          typeUrl: "/lbm.wasm.v1.MsgInstantiateContract",
          value: expectedValue,
        });
      }
    });

    it("works for MsgUpdateAdmin", () => {
      const aminoMsg: AminoMsgUpdateAdmin = {
        type: "wasm/MsgUpdateAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          new_admin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgUpdateAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        newAdmin: "cosmos10dyr9899g6t0pelew4nvf4j5c3jcgv0r73qga5",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/lbm.wasm.v1.MsgUpdateAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgClearAdmin", () => {
      const aminoMsg: AminoMsgClearAdmin = {
        type: "wasm/MsgClearAdmin",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgClearAdmin = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
      };
      expect(msg).toEqual({
        typeUrl: "/lbm.wasm.v1.MsgClearAdmin",
        value: expectedValue,
      });
    });

    it("works for MsgExecuteContract", () => {
      const aminoMsg: AminoMsgExecuteContract = {
        type: "wasm/MsgExecuteContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          msg: toBase64(toUtf8(`{"foo":"bar"}`)),
          funds: coins(1234, "cony"),
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgExecuteContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        msg: toUtf8(`{"foo":"bar"}`),
        funds: coins(1234, "cony"),
      };
      expect(msg).toEqual({
        typeUrl: "/lbm.wasm.v1.MsgExecuteContract",
        value: expectedValue,
      });
    });

    it("works for MsgMigrateContract", () => {
      const aminoMsg: AminoMsgMigrateContract = {
        type: "wasm/MsgMigrateContract",
        value: {
          sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
          contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
          code_id: "98765",
          migrate_msg: toBase64(toUtf8(`{"foo":"bar"}`)),
        },
      };
      const msg = new AminoTypes({ additions: cosmWasmTypes }).fromAmino(aminoMsg);
      const expectedValue: MsgMigrateContract = {
        sender: "cosmos1pkptre7fdkl6gfrzlesjjvhxhlc3r4gmmk8rs6",
        contract: "cosmos1xy4yqngt0nlkdcenxymg8tenrghmek4nmqm28k",
        codeId: Long.fromString("98765"),
        migrateMsg: toUtf8(`{"foo":"bar"}`),
      };
      expect(msg).toEqual({
        typeUrl: "/lbm.wasm.v1.MsgMigrateContract",
        value: expectedValue,
      });
    });
  });
});
