"use strict";Object.defineProperty(exports,"__esModule",{value:true});exports.default=void 0;var _util=require("../util");function _objectWithoutPropertiesLoose(source,excluded){if(source==null)return{};var target={};var sourceKeys=Object.keys(source);var key,i;for(i=0;i<sourceKeys.length;i++){key=sourceKeys[i];if(excluded.indexOf(key)>=0)continue;target[key]=source[key]}return target}const toProp=(lineName,version)=>([propName,propValue])=>{if(["TEL","ADR","EMAIL"].includes(lineName)&&version==="2.1")return propValue.join(";");return(0,_util).capitalDashCase(propName)+"="+(0,_util).capitalDashCase(propValue.join(","))};const toLine=version=>([name,i])=>{const{value,props}=i;const{group}=props,restProps=_objectWithoutPropertiesLoose(props,["group"]);const lineName=(group?group+".":"")+(0,_util).capitalDashCase(name);const propStr=Object.entries(restProps).map(toProp(lineName,version)).join(";");const joinedProps=propStr?";"+propStr:"";const propsStr=["2.1","3.0"].includes(version)?joinedProps.toUpperCase():joinedProps;return lineName+propsStr+":"+value};const seperateSameValues=(prev,[name,values])=>[...prev,...values.map(i=>[name,i]),];function unparseVCard(maggus,version){const begin="BEGIN:VCARD";const content=Object.entries(maggus).reduce(seperateSameValues,[]).map(toLine(version));const end="END:VCARD";const result=[begin,...content,end].join("\n");return result}var _default=unparseVCard;exports.default=_default
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91bnBhcnNpbmcvdW5wYXJzZVZDYXJkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNhcGl0YWxEYXNoQ2FzZSB9IGZyb20gXCIuLi91dGlsXCI7XG5cbmltcG9ydCB7IFZjZkZvcm1hdEVycm9yLCBWY2ZWZXJzaW9uRXJyb3IsIFZjZlZlcnNpb24gfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY29uc3QgdG9Qcm9wID1cbiAgKGxpbmVOYW1lOiBzdHJpbmcsIHZlcnNpb246IHN0cmluZykgPT5cbiAgKFtwcm9wTmFtZSwgcHJvcFZhbHVlXTogYW55KSA9PiB7XG4gICAgaWYgKFtcIlRFTFwiLCBcIkFEUlwiLCBcIkVNQUlMXCJdLmluY2x1ZGVzKGxpbmVOYW1lKSAmJiB2ZXJzaW9uID09PSBcIjIuMVwiKVxuICAgICAgcmV0dXJuIHByb3BWYWx1ZS5qb2luKFwiO1wiKTtcblxuICAgIHJldHVybiAoXG4gICAgICBjYXBpdGFsRGFzaENhc2UocHJvcE5hbWUpICsgXCI9XCIgKyBjYXBpdGFsRGFzaENhc2UocHJvcFZhbHVlLmpvaW4oXCIsXCIpKVxuICAgICk7XG4gIH07XG5cbmNvbnN0IHRvTGluZSA9XG4gICh2ZXJzaW9uOiBzdHJpbmcpID0+XG4gIChbbmFtZSwgaV0pID0+IHtcbiAgICBjb25zdCB7IHZhbHVlLCBwcm9wcyB9ID0gaTtcblxuICAgIGNvbnN0IHsgZ3JvdXAsIC4uLnJlc3RQcm9wcyB9ID0gcHJvcHM7XG5cbiAgICBjb25zdCBsaW5lTmFtZSA9IChncm91cCA/IGdyb3VwICsgXCIuXCIgOiBcIlwiKSArIGNhcGl0YWxEYXNoQ2FzZShuYW1lKTtcblxuICAgIGNvbnN0IHByb3BTdHIgPSBPYmplY3QuZW50cmllcyhyZXN0UHJvcHMpXG4gICAgICAubWFwKHRvUHJvcChsaW5lTmFtZSwgdmVyc2lvbikpXG4gICAgICAuam9pbihcIjtcIik7XG5cbiAgICBjb25zdCBqb2luZWRQcm9wcyA9IHByb3BTdHIgPyBcIjtcIiArIHByb3BTdHIgOiBcIlwiO1xuXG4gICAgY29uc3QgcHJvcHNTdHIgPSBbXCIyLjFcIiwgXCIzLjBcIl0uaW5jbHVkZXModmVyc2lvbilcbiAgICAgID8gam9pbmVkUHJvcHMudG9VcHBlckNhc2UoKVxuICAgICAgOiBqb2luZWRQcm9wcztcblxuICAgIHJldHVybiBsaW5lTmFtZSArIHByb3BzU3RyICsgXCI6XCIgKyB2YWx1ZTtcbiAgfTtcblxuLyoqXG4gKiBAZGVzYyB1c2VkIHRvIHNlcGVyYXRlIHRoZSBuZXN0ZWQganNvbiByZXByZXNlbnRhdGlvbiBpbnRvIG11bHRpcGxlIGxpbmVzLFxuICogZm9yIGV4YW1wbGUgbXVsdGlwbGUgcGhvbmUgbnVtYmVyc1xuICovXG5jb25zdCBzZXBlcmF0ZVNhbWVWYWx1ZXMgPSAocHJldiwgW25hbWUsIHZhbHVlc10pID0+IFtcbiAgLi4ucHJldixcbiAgLi4udmFsdWVzLm1hcCgoaSkgPT4gW25hbWUsIGldKSxcbl07XG5cbmZ1bmN0aW9uIHVucGFyc2VWQ2FyZChtYWdndXM6IGFueSwgdmVyc2lvbjogVmNmVmVyc2lvbik6IHN0cmluZyB7XG4gIGNvbnN0IGJlZ2luID0gXCJCRUdJTjpWQ0FSRFwiO1xuXG4gIGNvbnN0IGNvbnRlbnQgPSBPYmplY3QuZW50cmllcyhtYWdndXMpXG4gICAgLnJlZHVjZShzZXBlcmF0ZVNhbWVWYWx1ZXMsIFtdKVxuICAgIC5tYXAodG9MaW5lKHZlcnNpb24pKTtcblxuICBjb25zdCBlbmQgPSBcIkVORDpWQ0FSRFwiO1xuXG4gIGNvbnN0IHJlc3VsdCA9IFtiZWdpbiwgLi4uY29udGVudCwgZW5kXS5qb2luKFwiXFxuXCIpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5leHBvcnQgZGVmYXVsdCB1bnBhcnNlVkNhcmQ7XG4iXSwibmFtZXMiOlsidG9Qcm9wIiwibGluZU5hbWUiLCJ2ZXJzaW9uIiwicHJvcE5hbWUiLCJwcm9wVmFsdWUiLCJpbmNsdWRlcyIsImpvaW4iLCJjYXBpdGFsRGFzaENhc2UiLCJ0b0xpbmUiLCJuYW1lIiwiaSIsInZhbHVlIiwicHJvcHMiLCJncm91cCIsInJlc3RQcm9wcyIsInByb3BTdHIiLCJPYmplY3QiLCJlbnRyaWVzIiwibWFwIiwiam9pbmVkUHJvcHMiLCJwcm9wc1N0ciIsInRvVXBwZXJDYXNlIiwic2VwZXJhdGVTYW1lVmFsdWVzIiwicHJldiIsInZhbHVlcyIsInVucGFyc2VWQ2FyZCIsIm1hZ2d1cyIsImJlZ2luIiwiY29udGVudCIsInJlZHVjZSIsImVuZCIsInJlc3VsdCJdLCJtYXBwaW5ncyI6IkFBQUEsNEZBQWdDLEtBQUEsS0FBUyxTQUFULFNBQVMsQ0FBQSwyUUFJekMsTUFBTUEsTUFBTSxDQUNWLENBQUNDLFFBQWdCLENBQUVDLE9BQWUsR0FDbEMsQ0FBQyxDQUFDQyxRQUFRLENBQUVDLFNBQVMsQ0FBTSxHQUFLLENBQzlCLEdBQUksQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFFLE9BQU8sQ0FBQyxDQUFDQyxRQUFRLENBQUNKLFFBQVEsQ0FBQyxFQUFJQyxPQUFPLEdBQUssS0FBSyxDQUNqRSxPQUFPRSxTQUFTLENBQUNFLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxBQUU3QixPQUNFQyxDQUFBQSxFQUFBQSxLQUFlLEFBQVUsQ0FBQSxnQkFBVixDQUFDSixRQUFRLENBQUMsQ0FBRyxHQUFHLENBQUdJLENBQUFBLEVBQUFBLEtBQWUsQUFBcUIsQ0FBQSxnQkFBckIsQ0FBQ0gsU0FBUyxDQUFDRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQUFDdEUsQ0FDSCxBQUFDLEFBRUosT0FBTUUsTUFBTSxDQUNWLEFBQUNOLE9BQWUsRUFDaEIsQ0FBQyxDQUFDTyxJQUFJLENBQUVDLENBQUMsQ0FBQyxHQUFLLENBQ2IsS0FBTSxDQUFFQyxLQUFLLENBQUVDLEtBQUssQ0FBRSxDQUFHRixDQUFDLEFBQUMsQUFFM0IsTUFBTSxDQUFFRyxLQUFLLENBQWdCLENBQUdELEtBQUssQ0FBbkJFLFNBQVMsK0JBQUtGLEtBQUssRUFBN0JDLE9BQUssRUFBeUIsQUFFdEMsT0FBTVosUUFBUSxDQUFHLENBQUNZLEtBQUssQ0FBR0EsS0FBSyxDQUFHLEdBQUcsQ0FBRyxFQUFFLENBQUMsQ0FBR04sQ0FBQUEsRUFBQUEsS0FBZSxBQUFNLENBQUEsZ0JBQU4sQ0FBQ0UsSUFBSSxDQUFDLEFBQUMsQUFFcEUsT0FBTU0sT0FBTyxDQUFHQyxNQUFNLENBQUNDLE9BQU8sQ0FBQ0gsU0FBUyxDQUFDLENBQ3RDSSxHQUFHLENBQUNsQixNQUFNLENBQUNDLFFBQVEsQ0FBRUMsT0FBTyxDQUFDLENBQUMsQ0FDOUJJLElBQUksQ0FBQyxHQUFHLENBQUMsQUFBQyxBQUViLE9BQU1hLFdBQVcsQ0FBR0osT0FBTyxDQUFHLEdBQUcsQ0FBR0EsT0FBTyxDQUFHLEVBQUUsQUFBQyxBQUVqRCxPQUFNSyxRQUFRLENBQUcsQ0FBQyxLQUFLLENBQUUsS0FBSyxDQUFDLENBQUNmLFFBQVEsQ0FBQ0gsT0FBTyxDQUFDLENBQzdDaUIsV0FBVyxDQUFDRSxXQUFXLEVBQUUsQ0FDekJGLFdBQVcsQUFBQyxBQUVoQixRQUFPbEIsUUFBUSxDQUFHbUIsUUFBUSxDQUFHLEdBQUcsQ0FBR1QsS0FBSyxBQUFDLENBQzFDLEFBQUMsQUFNSixPQUFNVyxrQkFBa0IsQ0FBRyxDQUFDQyxJQUFJLENBQUUsQ0FBQ2QsSUFBSSxDQUFFZSxNQUFNLENBQUMsR0FBSyxJQUNoREQsSUFBSSxJQUNKQyxNQUFNLENBQUNOLEdBQUcsQ0FBQyxBQUFDUixDQUFDLEVBQUssQ0FBQ0QsSUFBSSxDQUFFQyxDQUFDLENBQUMsQ0FBQyxFQUNoQyxBQUFDLEFBRUYsVUFBU2UsWUFBWSxDQUFDQyxNQUFXLENBQUV4QixPQUFtQixDQUFVLENBQzlELE1BQU15QixLQUFLLENBQUcsYUFBYSxBQUFDLEFBRTVCLE9BQU1DLE9BQU8sQ0FBR1osTUFBTSxDQUFDQyxPQUFPLENBQUNTLE1BQU0sQ0FBQyxDQUNuQ0csTUFBTSxDQUFDUCxrQkFBa0IsQ0FBRSxFQUFFLENBQUMsQ0FDOUJKLEdBQUcsQ0FBQ1YsTUFBTSxDQUFDTixPQUFPLENBQUMsQ0FBQyxBQUFDLEFBRXhCLE9BQU00QixHQUFHLENBQUcsV0FBVyxBQUFDLEFBRXhCLE9BQU1DLE1BQU0sQ0FBRyxDQUFDSixLQUFLLElBQUtDLE9BQU8sQ0FBRUUsR0FBRyxDQUFDLENBQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEFBQUMsQUFFbkQsUUFBT3lCLE1BQU0sQUFBQyxDQUNmLGFBQ2NOLFlBQVkseUJBQUMifQ==