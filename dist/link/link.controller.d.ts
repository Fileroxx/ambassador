import { LinkService } from './link.service';
export declare class LinkController {
    private linkService;
    constructor(linkService: LinkService);
    all(id: number): Promise<any[]>;
}
