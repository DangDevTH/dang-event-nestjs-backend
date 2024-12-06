"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostsModule = void 0;
var common_1 = require("@nestjs/common");
var posts_resolver_1 = require("./posts.resolver");
var typeorm_1 = require("@nestjs/typeorm");
var post_entity_1 = require("./entities/post.entity");
var create_post_provider_1 = require("./providers/create-post.provider");
var users_module_1 = require("src/users/users.module");
var search_post_in_page_provider_1 = require("./providers/search-post-in-page.provider");
var find_post_by_id_provider_1 = require("./providers/find-post-by-id.provider");
var posts_service_1 = require("./providers/posts.service");
var posts_controller_1 = require("./posts.controller");
var PostsModule = /** @class */ (function () {
    function PostsModule() {
    }
    PostsModule = __decorate([
        common_1.Module({
            imports: [users_module_1.UsersModule, typeorm_1.TypeOrmModule.forFeature([post_entity_1.Post])],
            providers: [posts_resolver_1.PostsResolver, posts_service_1.PostsService, create_post_provider_1.CreatePostProvider, search_post_in_page_provider_1.SearchPostInPageProvider, find_post_by_id_provider_1.FindPostByIdProvider],
            controllers: [posts_controller_1.PostsController]
        })
    ], PostsModule);
    return PostsModule;
}());
exports.PostsModule = PostsModule;
