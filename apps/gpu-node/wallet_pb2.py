# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# NO CHECKED-IN PROTOBUF GENCODE
# source: wallet.proto
# Protobuf Python Version: 6.31.0
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import runtime_version as _runtime_version
from google.protobuf import symbol_database as _symbol_database
from google.protobuf.internal import builder as _builder
_runtime_version.ValidateProtobufRuntimeVersion(
    _runtime_version.Domain.PUBLIC,
    6,
    31,
    0,
    '',
    'wallet.proto'
)
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x0cwallet.proto\x12\x06wallet\"`\n\rVanityRequest\x12\x0f\n\x07pattern\x18\x01 \x01(\t\x12\x13\n\x0bstarts_with\x18\x02 \x01(\t\x12\x11\n\tends_with\x18\x03 \x01(\t\x12\x16\n\x0e\x63\x61se_sensitive\x18\x04 \x01(\x08\"G\n\x0eVanityResponse\x12\x12\n\npublic_key\x18\x01 \x01(\t\x12\x12\n\nsecret_key\x18\x02 \x01(\t\x12\r\n\x05match\x18\x03 \x01(\t2R\n\x0fWalletGenerator\x12?\n\x0eGenerateWallet\x12\x15.wallet.VanityRequest\x1a\x16.wallet.VanityResponseb\x06proto3')

_globals = globals()
_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, _globals)
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'wallet_pb2', _globals)
if not _descriptor._USE_C_DESCRIPTORS:
  DESCRIPTOR._loaded_options = None
  _globals['_VANITYREQUEST']._serialized_start=24
  _globals['_VANITYREQUEST']._serialized_end=120
  _globals['_VANITYRESPONSE']._serialized_start=122
  _globals['_VANITYRESPONSE']._serialized_end=193
  _globals['_WALLETGENERATOR']._serialized_start=195
  _globals['_WALLETGENERATOR']._serialized_end=277
# @@protoc_insertion_point(module_scope)
