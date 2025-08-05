import { Observable } from "rxjs";
import { ACTION } from "../model/action.type";
import { Store } from "@ngrx/store";
import { Theme } from "../reducers/them.reducer";

export class ThemeHandler {
    theme$!: Observable<Theme>;

    constructor(
        private store: Store<{theme: Theme}>
    ) {
        this.theme$ = store.select('theme');
    }

    changeTheme(): void {
        const main = document.querySelectorAll('[data-theme="main-theme"]') ?? [];
        const title = document.querySelectorAll('[data-theme="title"]') ?? [];
        const text = document.querySelectorAll('[data-theme="text"]') ?? [];
        
        this.theme$.subscribe({
            next: (value) => {
                this.applyColorToElements(main, 'main', value.mainTheme);
                this.applyColorToElements(title, 'title', value.titleColor);
                this.applyColorToElements(text, 'text', value.textColor);
            }
        });

        
        console.log(main);
    }

    applyColorToElements(elements: NodeListOf<Element>, action: ACTION, value: string) {
        if (elements && elements.length > 0) {
            elements.forEach(element => {
                const el = element as HTMLElement;
                switch (action) {
                    case 'main':
                    case 'secondary':
                    case 'background':
                        return el.style.background = value;
                    case 'text':
                    case 'title':
                        return el.style.color = value;
                    default:
                        return '';
                }
            });
        }
    }
}