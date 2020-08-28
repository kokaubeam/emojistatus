// swift-tools-version:5.3

import PackageDescription

let package = Package(
    name: "Codegen",
    dependencies: [
        .package(name: "Apollo", url: "https://github.com/apollographql/apollo-ios.git", .upToNextMinor(from: "0.31.0"))
    ],
    targets: [
        .target(
            name: "Codegen",
            dependencies: [
                .product(name: "ApolloCodegenLib", package: "Apollo"),
            ]),
        .testTarget(
            name: "CodegenTests",
            dependencies: ["Codegen"]),
    ]
)
