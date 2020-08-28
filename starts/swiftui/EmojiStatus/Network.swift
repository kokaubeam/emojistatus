import Foundation
import Apollo

class Network: HTTPNetworkTransportDelegate {
    static let shared = Network()

    private lazy var networkTransport: HTTPNetworkTransport = {
        let transport = HTTPNetworkTransport(url: URL(string: "http://localhost:4000/graphql")!)
        transport.delegate = self
        return transport
    }()
    
    private(set) lazy var apollo = ApolloClient(
        networkTransport: self.networkTransport,
        store: ApolloStore(cache: InMemoryNormalizedCache())
    )
}
