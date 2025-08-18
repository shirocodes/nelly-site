import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import { describe, expect, it } from "vitest";

describe('Home Page', () => {
    it('renders the heroSection, servicesPreview, and Testimonials components', () => {
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )

        expect(screen.getByText(/Using Behavioral Therapy to Help Kids Thrive./i)).toBeInTheDocument()
        expect(screen.getByText(/our behavior therapy services/i)).toBeInTheDocument()
        expect(screen.getByText(/what parents say/i)).toBeInTheDocument()
    })
})