import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private excludedUrls = [
        'http://127.0.0.1:8000/api/account/login/',
        'http://127.0.0.1:8000/api/account/register/'
    ];

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem('token');

        // Check if the request URL is in the excludedUrls array
        const isExcludedUrl = this.excludedUrls.some(url => req.url.includes(url));

        if (idToken && !isExcludedUrl) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            });
            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
