export declare class HealthController {
    check(): {
        status: string;
        timestamp: string;
    };
    liveness(): {
        status: string;
    };
    readiness(): {
        status: string;
    };
    database(): {
        status: string;
        component: string;
    };
    redis(): {
        status: string;
        component: string;
    };
}
