"use strict";var STATUS_CODE_ID,STATUS_CODE,MESSAGE_STATUS;Object.defineProperty(exports,"__esModule",{value:!0}),exports.UnauthorizedException=exports.BadRequestException=exports.NotFoundException=exports.InternalServerErrorException=exports.BaseException=exports.MESSAGE_STATUS=exports.STATUS_CODE=exports.STATUS_CODE_ID=void 0,function(e){e.INTERNAL_SERVER_ERROR="INTERNAL_SERVER_ERROR",e.NOT_FOUND="NOT_FOUND",e.BAD_REQUEST="BAD_REQUEST",e.UNAUTHORIZED="UNAUTHORIZED",e.OK="OK"}(STATUS_CODE_ID||(exports.STATUS_CODE_ID=STATUS_CODE_ID={})),function(e){e[e.OK=200]="OK",e[e.BAD_REQUEST=400]="BAD_REQUEST",e[e.UNAUTHORIZED=401]="UNAUTHORIZED",e[e.FORBIDDEN=403]="FORBIDDEN",e[e.NOT_FOUND=404]="NOT_FOUND",e[e.PRECONDITION_FAILED=428]="PRECONDITION_FAILED",e[e.INTERNAL_SERVER_ERROR=500]="INTERNAL_SERVER_ERROR"}(STATUS_CODE||(exports.STATUS_CODE=STATUS_CODE={})),function(e){e.INTERNAL_SERVER_ERROR="Internal server error",e.NOT_FOUND="Not found",e.BAD_REQUEST="Bad request",e.UNAUTHORIZED="Unauthorized"}(MESSAGE_STATUS||(exports.MESSAGE_STATUS=MESSAGE_STATUS={}));class BaseException extends Error{constructor(e){super(e)}}exports.BaseException=BaseException;class InternalServerErrorException extends BaseException{constructor(e){super(e.message),this.statusCodeId=STATUS_CODE_ID.INTERNAL_SERVER_ERROR,this.status=STATUS_CODE.INTERNAL_SERVER_ERROR,Object.assign(this,e)}}exports.InternalServerErrorException=InternalServerErrorException;class NotFoundException extends BaseException{constructor(e){super(e.message),this.statusCodeId=STATUS_CODE_ID.NOT_FOUND,this.status=STATUS_CODE.NOT_FOUND,Object.assign(this,e)}}exports.NotFoundException=NotFoundException;class BadRequestException extends BaseException{constructor(e){super(e.message),this.statusCodeId=STATUS_CODE_ID.BAD_REQUEST,this.status=STATUS_CODE.BAD_REQUEST,Object.assign(this,e)}}exports.BadRequestException=BadRequestException;class UnauthorizedException extends BaseException{constructor(e){super(e.message),this.statusCodeId=STATUS_CODE_ID.UNAUTHORIZED,this.status=STATUS_CODE.UNAUTHORIZED,Object.assign(this,e)}}exports.UnauthorizedException=UnauthorizedException;