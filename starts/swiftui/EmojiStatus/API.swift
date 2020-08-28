// @generated
//  This file was automatically generated and should not be edited.

import Apollo
import Foundation

public final class ContentViewQuery: GraphQLQuery {
  /// The raw GraphQL definition of this operation.
  public let operationDefinition: String =
    """
    query ContentView {
      me {
        __typename
        displayName
        status {
          __typename
          emoji
        }
      }
    }
    """

  public let operationName: String = "ContentView"

  public let operationIdentifier: String? = "6fb6702f2de051a4d54f8f07c050addbb03212545c967d4ba63777b7622b89b4"

  public init() {
  }

  public struct Data: GraphQLSelectionSet {
    public static let possibleTypes: [String] = ["Query"]

    public static var selections: [GraphQLSelection] {
      return [
        GraphQLField("me", type: .object(Me.selections)),
      ]
    }

    public private(set) var resultMap: ResultMap

    public init(unsafeResultMap: ResultMap) {
      self.resultMap = unsafeResultMap
    }

    public init(me: Me? = nil) {
      self.init(unsafeResultMap: ["__typename": "Query", "me": me.flatMap { (value: Me) -> ResultMap in value.resultMap }])
    }

    public var me: Me? {
      get {
        return (resultMap["me"] as? ResultMap).flatMap { Me(unsafeResultMap: $0) }
      }
      set {
        resultMap.updateValue(newValue?.resultMap, forKey: "me")
      }
    }

    public struct Me: GraphQLSelectionSet {
      public static let possibleTypes: [String] = ["User"]

      public static var selections: [GraphQLSelection] {
        return [
          GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
          GraphQLField("displayName", type: .nonNull(.scalar(String.self))),
          GraphQLField("status", type: .nonNull(.object(Status.selections))),
        ]
      }

      public private(set) var resultMap: ResultMap

      public init(unsafeResultMap: ResultMap) {
        self.resultMap = unsafeResultMap
      }

      public init(displayName: String, status: Status) {
        self.init(unsafeResultMap: ["__typename": "User", "displayName": displayName, "status": status.resultMap])
      }

      public var __typename: String {
        get {
          return resultMap["__typename"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "__typename")
        }
      }

      public var displayName: String {
        get {
          return resultMap["displayName"]! as! String
        }
        set {
          resultMap.updateValue(newValue, forKey: "displayName")
        }
      }

      public var status: Status {
        get {
          return Status(unsafeResultMap: resultMap["status"]! as! ResultMap)
        }
        set {
          resultMap.updateValue(newValue.resultMap, forKey: "status")
        }
      }

      public struct Status: GraphQLSelectionSet {
        public static let possibleTypes: [String] = ["Status"]

        public static var selections: [GraphQLSelection] {
          return [
            GraphQLField("__typename", type: .nonNull(.scalar(String.self))),
            GraphQLField("emoji", type: .nonNull(.scalar(String.self))),
          ]
        }

        public private(set) var resultMap: ResultMap

        public init(unsafeResultMap: ResultMap) {
          self.resultMap = unsafeResultMap
        }

        public init(emoji: String) {
          self.init(unsafeResultMap: ["__typename": "Status", "emoji": emoji])
        }

        public var __typename: String {
          get {
            return resultMap["__typename"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "__typename")
          }
        }

        public var emoji: String {
          get {
            return resultMap["emoji"]! as! String
          }
          set {
            resultMap.updateValue(newValue, forKey: "emoji")
          }
        }
      }
    }
  }
}
