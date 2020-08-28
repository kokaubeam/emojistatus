import Foundation
import ApolloCodegenLib

let parentFolderOfScriptFile = FileFinder.findParentFolder()
let sourceRootURL = parentFolderOfScriptFile
  .apollo.parentFolderURL() // Result: Sources folder
  .apollo.parentFolderURL() // Result: Codegen folder
  .apollo.parentFolderURL() // Result: Moji source root folder

let cliFolderURL = sourceRootURL
  .apollo.childFolderURL(folderName: "Codegen")
  .apollo.childFolderURL(folderName: "ApolloCLI")

let targetRootURL = sourceRootURL.apollo.childFolderURL(folderName: "EmojiStatus")

let endpoint = URL(string: "http://localhost:4000/graphql")!
let output = sourceRootURL.apollo.childFolderURL(folderName:"EmojiStatus")

try FileManager.default.apollo.createFolderIfNeeded(at: output)

let schemaDownloadOptions = ApolloSchemaOptions(endpointURL: endpoint, outputFolderURL: output)
let codegenOptions = ApolloCodegenOptions(targetRootURL: output)

do {
    try ApolloSchemaDownloader.run(with: cliFolderURL, options: schemaDownloadOptions)
    try ApolloCodegen.run(from: output, with: cliFolderURL, options: codegenOptions)
} catch {
    exit(1)
}
