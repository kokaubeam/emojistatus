import SwiftUI

struct ContentView: View {
    @State private var me: ContentViewQuery.Data.Me?
    
    var welcomeText: String {
        guard let displayName = me?.displayName else {
            return "Hi There!"
        }
        
        return "Welcome \(displayName)!!"
    }
    
    var body: some View {
        VStack {
            Text(welcomeText)
            
            VStack {
                if let me = self.me {
                    Text(me.status.emoji)
                        .font(.system(size: 128))
                        .padding()
                } else {
                    Image(systemName: "circle.fill")
                        .font(.system(size: 128))
                        .foregroundColor(.init(red: 0.9, green: 0.9, blue: 0.9))
                        .padding()
                }
            }
        }
        .onAppear(perform: loadData)
    }
    
    func loadData() {
        Network.shared.apollo.fetch(query: ContentViewQuery()) { result in
            switch result {
            case .success(let graphQLResult):
                me = graphQLResult.data?.me
            case .failure(let error):
                print(error.localizedDescription)
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
