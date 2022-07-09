"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _util=require("../util");function parseMaggus(value){let errs=[];if("data"in value)value=value.data;const version=value["version"][0].value;const versionErrs=(0,_util).validateVersion(version);const status=(0,_util).getStatus(versionErrs);return{errors:versionErrs,data:value,meta:{format:"maggus",version,status}}}var _default=parseMaggus;exports.default=_default
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wYXJzaW5nL3BhcnNlTWFnZ3VzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRlVmVyc2lvbiwgZ2V0U3RhdHVzIH0gZnJvbSBcIi4uL3V0aWxcIjtcbmltcG9ydCB0eXBlIHsgUGFyc2VPcHRpb25zLCBQYXJzZVJlc3VsdCB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5mdW5jdGlvbiBwYXJzZU1hZ2d1cyh2YWx1ZTogYW55KTogUGFyc2VSZXN1bHQge1xuICBsZXQgZXJyczogUGFyc2VSZXN1bHRbXCJlcnJvcnNcIl0gPSBbXTtcblxuICBpZiAoXCJkYXRhXCIgaW4gdmFsdWUpIHZhbHVlID0gdmFsdWUuZGF0YTtcblxuICBjb25zdCB2ZXJzaW9uID0gdmFsdWVbXCJ2ZXJzaW9uXCJdWzBdLnZhbHVlO1xuXG4gIGNvbnN0IHZlcnNpb25FcnJzID0gdmFsaWRhdGVWZXJzaW9uKHZlcnNpb24pO1xuXG4gIGNvbnN0IHN0YXR1cyA9IGdldFN0YXR1cyh2ZXJzaW9uRXJycyk7XG5cbiAgcmV0dXJuIHtcbiAgICBlcnJvcnM6IHZlcnNpb25FcnJzLFxuICAgIGRhdGE6IHZhbHVlLFxuICAgIG1ldGE6IHtcbiAgICAgIGZvcm1hdDogXCJtYWdndXNcIixcbiAgICAgIHZlcnNpb24sXG4gICAgICBzdGF0dXMsXG4gICAgfSxcbiAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IHBhcnNlTWFnZ3VzO1xuIl0sIm5hbWVzIjpbInBhcnNlTWFnZ3VzIiwidmFsdWUiLCJlcnJzIiwiZGF0YSIsInZlcnNpb24iLCJ2ZXJzaW9uRXJycyIsInZhbGlkYXRlVmVyc2lvbiIsInN0YXR1cyIsImdldFN0YXR1cyIsImVycm9ycyIsIm1ldGEiLCJmb3JtYXQiXSwibWFwcGluZ3MiOiJBQUFBLDRGQUEyQyxLQUFBLEtBQVMsU0FBVCxTQUFTLENBQUEsQUFHcEQsVUFBU0EsV0FBVyxDQUFDQyxLQUFVLENBQWUsQ0FDNUMsSUFBSUMsSUFBSSxDQUEwQixFQUFFLEFBQUMsQUFFckMsSUFBSSxNQUFNLEdBQUlELEtBQUssQ0FBRUEsS0FBSyxDQUFHQSxLQUFLLENBQUNFLElBQUksQUFBQyxBQUV4QyxPQUFNQyxPQUFPLENBQUdILEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQ0EsS0FBSyxBQUFDLEFBRTFDLE9BQU1JLFdBQVcsQ0FBR0MsQ0FBQUEsRUFBQUEsS0FBZSxBQUFTLENBQUEsZ0JBQVQsQ0FBQ0YsT0FBTyxDQUFDLEFBQUMsQUFFN0MsT0FBTUcsTUFBTSxDQUFHQyxDQUFBQSxFQUFBQSxLQUFTLEFBQWEsQ0FBQSxVQUFiLENBQUNILFdBQVcsQ0FBQyxBQUFDLEFBRXRDLE9BQU8sQ0FDTEksTUFBTSxDQUFFSixXQUFXLENBQ25CRixJQUFJLENBQUVGLEtBQUssQ0FDWFMsSUFBSSxDQUFFLENBQ0pDLE1BQU0sQ0FBRSxRQUFRLENBQ2hCUCxPQUFPLENBQ1BHLE1BQU0sQ0FDUCxDQUNGLEFBQUMsQ0FDSCxhQUNjUCxXQUFXLHlCQUFDIn0=